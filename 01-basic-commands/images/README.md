## 创建镜像

```bash
# 基于已有的容器创建
docker commit -m "message" -a "author" CONTAINER REPOSITORY:TAG

# 基于本地模板导入
cat XOS.tar | docker import - lqshow/test:v1.0
```

## 查看镜像

```bash
# 查找现有镜像（来源：Docker hub公共的可用镜像）
docker search image_name

# 列出所有镜像
docker images

# 查找 dangling 镜像
docker images --filter "dangling=true"
```

## 镜像操作

```bash
# 获取镜像
docker pull image_name
docker pull docker-reg.basebit.me:5000/basebit/xdp-sdk-jre8

# 发布镜像
docker push lqsow/static_web

# 重命名镜像
docker tag image_name new_image_name

# 获取镜像的创建历史
docker history image_name

# 查看镜像
docker inspect nginx:1.13.0-alpine -f {{".ContainerConfig"}}
```

## 导入导出

```bash
# 保存(导出)镜像
docker save -o <image_name>.tar <image_id>
docker save <image_id>  > <image_name>.tar

# 加载（导入）镜像
dokcer load --input img_java.tar
docker load < img_java.tar
```

## 删除镜像

1. 当有该镜像创建的容器存在时，镜像文件是无法被删除的。正确做法是先删除依赖该镜像的相关容器，然后再删除此镜像。

2. 强行使用 -f 参数删除，会带来 none 镜像。

```bash
# 删除一个镜像
docker rmi image_name

# 删除多个镜像
docker rmi image_name image_name2

# 批量删除临时镜像文件
docker rmi $(docker images -q -f dangling=true)

# 删除所有镜像
docker rmi -f `docker images -a -q`

# 删除none镜像
docker rmi $(docker images | grep "none" | awk '{print $3}') 

# 批量删除repository ,tag 为none 的镜像
docker images |grep none|awk '{print $3}'|xargs docker rmi
```
