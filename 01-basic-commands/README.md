## 基本命令

### 查看 Docker 磁盘使用情况

```bash
# 查看占用分布
docker system df

# 进一步查看空间占用细节，以确定是哪个镜像、容器或本地卷占用过高空间
docker system df -v
```
### 清理 Docker 空间
```bash
# 清除所有未被使用的镜像和悬空镜像
docker system prune -a

# 强制删除
docker system prune -f

# 删除悬空的镜像
docker image prune

# 删除无用的容器
docker container prune
```