#!/bin/bash

# 添加 npm 的路径到 PATH
export PATH=/home/mengchen/.nvm/versions/node/v22.12.0/bin:$PATH

# 确定脚本所在目录（仓库根目录）
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
PROJECT_DIR="$SCRIPT_DIR"
BUILD_DIR="$PROJECT_DIR/.vitepress/dist" # 构建输出目录
TARGET_DIR="/opt/1panel/apps/openresty/openresty/www/sites/fe.mimeng.top"
LOG_FILE="$PROJECT_DIR/deploy.log"

# 写入日志函数
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a $LOG_FILE
}

log "开始部署..."

# 进入项目目录
cd $PROJECT_DIR || { log "项目目录不存在！"; exit 1; }

# 安装依赖
log "安装依赖..."
if [ -f "package.json" ]; then
  npm install || { log "依赖安装失败！"; exit 1; }
fi

# 构建项目
log "构建项目..."
if [ -f "package.json" ]; then
  npm run docs:build || { log "项目构建失败！"; exit 1; }
fi

# 检查构建输出目录是否存在
if [ ! -d "$BUILD_DIR" ]; then
  log "构建输出目录不存在：$BUILD_DIR"
  exit 1
fi

# 复制构建文件到目标目录
log "复制构建文件到目标目录..."
rsync -avz --delete "$BUILD_DIR/" "$TARGET_DIR/" || { log "文件复制失败！"; exit 1; }

log "部署完成！"