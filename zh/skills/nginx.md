# 必备技能 - Nginx

## 为什么要学习 Nginx ?

Nginx 的强大功能使其成为 Web 开发和部署中的重要工具。以下是一个具体示例，说明为什么学习 Nginx 是必要的：

### 示例：反向代理

反向代理是 Nginx 最核心的功能之一。作为反向代理服务器，Nginx 可以接收客户端的请求，然后将请求转发给内部网络上的服务器，并将从服务器上获取的响应返回给客户端。

反向代理的主要优势包括：

1. **负载均衡**：可以将请求分发到多个服务器，提高系统的可用性和可靠性。
2. **安全性**：通过隐藏内部服务器的真实 IP 地址，增强系统安全性。
3. **缓存加速**：可以缓存静态内容，减轻后端服务器的压力。
4. **SSL 终结**：可以在 Nginx 层处理 HTTPS 请求，后端服务器只需处理 HTTP 请求。

基本的反向代理配置示例：

<details>
<summary>点击查看完整配置</summary>

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

</details>

在这个配置中，所有到 `example.com` 的请求都会被转发到 `http://localhost:3000`。这种模式特别适合微服务架构，可以将多个服务统一到一个入口点。

### 示例：HTTP 转 HTTPS

在现代网站开发中，HTTPS 已经成为标准配置。通过 Nginx，可以轻松实现将 HTTP 请求自动重定向到 HTTPS，确保所有流量都使用加密连接：

<details>
<summary>点击查看完整配置</summary>

```nginx
server {
  listen 80;
  server_name example.com www.example.com;

  # 将所有 HTTP 请求重定向到 HTTPS
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name example.com www.example.com;

  # SSL 证书配置
  ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

  # 推荐的 SSL 配置
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers on;
  ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
  ssl_session_timeout 1d;
  ssl_session_cache shared:SSL:10m;
  ssl_stapling on;
  ssl_stapling_verify on;

  # 其他站点配置
  location / {
    root /var/www/html;
    index index.html;
  }
}
```

</details>

这个配置实现了以下功能：

1. 第一个 `server` 块监听 80 端口（HTTP），将所有请求重定向到 HTTPS 版本
2. 第二个 `server` 块监听 443 端口（HTTPS），配置了 SSL 证书和安全参数
3. 使用 `return 301` 指令实现永久重定向，有利于搜索引擎优化

通过这种配置，可以确保网站访问者总是使用加密连接，提高网站的安全性和专业性。同时，对于已经习惯输入 `http://` 开头地址的用户，也能自动跳转到安全版本，提升用户体验。

### 示例：同一域名支持前端和后端服务

假设你有一个域名 `example.com`，希望实现以下需求：

- 访问 `https://example.com` 时，用户看到的是前端应用（如 React 或 Vue）。
- 访问 `https://example.com/api` 时，用户请求被转发到后端服务（如 Nest.js 或 Spring Boot）。

通过 Nginx，可以轻松实现这样的配置：

<details>
<summary>点击查看完整配置</summary>

```nginx
server {
  listen 80;
  server_name example.com;

  # 配置前端服务
  location / {
    root /var/www/frontend;
    index index.html;
  }

  # 配置后端服务
  location /api {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

</details>

### 示例：解决跨域问题

在开发过程中，前端和后端通常运行在不同的域名或端口下，这会导致跨域问题。特别是当你使用的是他人提供的后端服务，而对方无法或不方便为你的域名添加跨域支持时，可以通过 Nginx 在前端代理层面解决跨域问题。

以下是一个示例配置：

<details>
<summary>点击查看完整配置</summary>

```nginx
server {
  listen 80;
  server_name api.example.com;

  location /api {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    # 添加跨域头
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
    add_header Access-Control-Allow-Headers "Content-Type, Authorization";

    # 处理 OPTIONS 请求
    if ($request_method = OPTIONS) {
      return 204;
    }
  }
}
```

</details>

通过以上配置，Nginx 可以为后端服务添加跨域支持，从而解决前后端分离开发中的跨域问题。这种方式特别适用于以下场景：

1. **后端服务由第三方提供**：你无法直接修改后端服务的跨域配置。
2. **快速调试**：在开发阶段，通过 Nginx 添加跨域支持可以快速解决问题，而无需等待后端修改。
3. **灵活性**：你可以根据需要自定义跨域规则，满足不同的业务需求。

### 为什么这很重要？

1. **统一域名管理**：通过 Nginx，可以在同一域名下管理前端和后端服务，提升用户体验。
2. **简化部署**：无需为前端和后端分别配置不同的域名或端口，简化了部署流程。
3. **灵活的路由规则**：Nginx 提供强大的路由功能，可以根据路径、请求头等条件灵活分发请求。
4. **性能优化**：Nginx 作为反向代理，可以缓存静态资源、压缩响应内容，从而提升整体性能。

通过学习 Nginx，不仅可以掌握这些实用技能，还能更高效地构建和管理 Web 应用。

## 最佳学习方式

学习 Nginx 和 OpenResty 最好的方式就是实践。如果想图省事，可以尝试以下方法：

1. **准备一台服务器**：可以使用云服务器或本地虚拟机。
2. **安装 1Panel**：1Panel 是一个简单易用的服务器管理面板，支持快速安装和管理各种应用。你可以通过 [1Panel 官方网站](https://1panel.cn) 获取更多信息。
3. **安装 OpenResty 应用**：通过 1Panel，可以一键安装 OpenResty，并使用面板进行配置和操作。

通过这种方式，你可以快速掌握 Nginx 和 OpenResty 的实际应用。在实践中学习，不仅能加深理解，还能更高效地解决实际问题，让学习事半功倍。

## 推荐使用 OpenResty

[OpenResty](https://openresty.org/cn/) 是基于 Nginx 的高性能 Web 平台，集成了 Lua 脚本支持和许多扩展模块，适合开发动态 Web 应用和高性能 API 服务。推荐使用 OpenResty 的原因包括：

1. **强大的 Lua 脚本支持**：通过嵌入 Lua 脚本，OpenResty 可以实现复杂的业务逻辑，灵活性极高。
2. **丰富的模块**：OpenResty 集成了许多实用模块（如 Redis、MySQL、JSON 解析等），减少了开发和部署的复杂性。
3. **高性能**：继承了 Nginx 的高性能特性，同时通过 LuaJIT 提供更快的脚本执行速度。
4. **适合微服务架构**：OpenResty 非常适合用作 API 网关，支持动态路由、限流、认证等功能。
5. **活跃的社区**：OpenResty 拥有活跃的开发者社区和丰富的学习资源。

### Nginx 相关资料

- **官方文档**  
   [Nginx 官方文档](https://nginx.org/en/docs/)

- **在线教程**

  - [Nginx 教程](https://nginx.mosong.cc/)

- **社区资源**
  - [Nginx 社区论坛](https://community.nginx.org/)
  - [GitHub](https://github.com/nginx/nginx)

### OpenResty 相关资料

- **官方文档**  
   [OpenResty 官方文档](https://openresty.org/cn/)
- **社区资源**
  - [OpenResty 社区论坛](https://forum.openresty.us/)
  - [GitHub 上的 OpenResty 项目](https://github.com/openresty/openresty)

<style>
  details {
    border: 1px solid #dcdcdc;
    background-color: #E3F2FD;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  details .language-nginx {
    margin: 12px!important;
  }

  details summary {
    margin: 0!important;
    padding: 12px 18px;
    background-color: #E3F2FD;
    border-bottom: 1px solid #dcdcdc;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
    color: #333;
  }

  details[open] summary {
    border-bottom: 1px solid #dcdcdc;
  }

  details pre {
    margin: 0;
    padding: 16px;
    background-color: #f4f4f4;
    font-size: 0.95rem;
    color: #444;
    overflow: auto;
    line-height: 1.5;
  }
</style>
