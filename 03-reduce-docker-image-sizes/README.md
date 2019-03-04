# Overview

在构建 Docker 镜像时，如果方法不得当，Docker 镜像可以轻松达到 GB 级别。 

现在到处都在说分钟级别的部署，如果每个镜像都达到 GB 级别以上，要想实现这点还是相当困难的。

所以我们应该尽量想办法获得体积更小的镜像，因为传输和部署体积较小的镜像速度更快。

## 使用 .dockerignore 文件

排除上下文中构建用不到的目录和文件，语法同.gitignore

#### 好处

1. 构建镜像时能够减少镜像大小
2. 修改排除的文件，重新构建镜像时可忽略

一个 Node.js 项目的 .dockerignore 文件通常应该是这样的，不能将上下文中的 node_modules 放里面，这里涉及不同操作系统生成的包问题。

```bash
deploy
node_modules
npm-debug.log
dist
.git
.env
```

## 减少层数
Dockerfile 中的每条指令都会创建一个镜像层，层会占用空间，层越多，最终的镜像就越大。

指令和层的数量应该保持在最小，我们通过合并指令来减少层数。

```dockerfile
# bad example
RUN yum install -y wget
RUN yum install -y net-tools

# good example
RUN yum install -y wget net-tools
```
```dockerfile
# bad example
# 虽然在最后删除了文件，但是镜像实际大小并没有变化
FROM busybox
WORKDIR /tmp/foo

RUN dd if=/dev/zero of=/tmp/foo/bar bs=1048576 count=100
RUN rm /tmp/foo/bar

# good example
FROM busybox
WORKDIR /tmp/foo

RUN dd if=/dev/zero of=/tmp/foo/bar bs=1048576 count=100 && rm /tmp/foo/bar
```

## 合理的选择 COPY 和 ADD 命令

1. `COPY` 只支持将本地文件复制到容器中
2. `ADD` 具有额外的功能（如仅限本地的tar提取和远程URL支持)

如果仅仅用于复制文件，请选择 `COPY` ，简单更有效。如果需要提取存档，需要使用 `ADD`。
```dockerfile
# bad example
# 比如将一个local 的包解压，通过 COPY 命令，执行如下，需要两步
# 这里用 COPY，其实是个错误的选择
WORKDIR /usr/java
COPY resource/jdk1.8.0_77.tgz /usr/java/jdk1.8.0_77.tgz
RUN tar -zxvf /usr/java/jdk1.8.0_77.tgz -C /usr/java

# good example
# 用 ADD 命令，一步到位
ADD resource/jdk1.8.0_77.tgz /usr/java
```

## 减少不必要的安装工具

Docker 镜像里只留下需要用到的，其他的无关联的包不应该打包到镜像内。比如 vim 或者 curl 等，这些基本都是调试用的工具。

如果需要在容器内调试，可以准备一个开发环境 Dockerfile 和 一个生产环境的 Dockerfile。 

## 清除不必要的系统缓存

以下语句应该在 install 层级的后面加上，这样做的好处，能够很大程度减少镜像的大小。

```bash
# Centos 环境，安装最后加上
yum clean all
 
# Ubuntu 环境，安装最后加上
rm -rf /var/lib/apt/lists/*
 
# alpine 环境，安装最后加上
rm -rf /var/cache/apk/*
 
# 或者 alpine 可以使用 --no-cache 来安装
apk add --no-cache bash
```

## 使用 multi-stage 构建

生产环境下使用小体积的 alpine 基础镜像进行多级构建，减少最终镜像文件的大小

## References

- [How to write excellent Dockerfiles](https://rock-it.pl/how-to-write-excellent-dockerfiles/)
- [Best Practices for working with Dockerfiles](https://medium.com/@nagarwal/best-practices-for-working-with-dockerfiles-fb2d22b78186)
- ["Distroless" Docker Images](https://github.com/GoogleContainerTools/distroless)
- [3 simple tricks for smaller Docker images](https://itnext.io/3-simple-tricks-for-smaller-docker-images-f0d2bda17d1e)

