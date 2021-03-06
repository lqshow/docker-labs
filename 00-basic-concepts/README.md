## 概念

Docker 是一个能够把开发的应用程序自动部署到容器的开源引擎，是一个轻量级容器管理引擎，它改变了传统软件的交付和运行方式。

## 为什么要使用 Docker

- 更快速的交付和部署

- 更高效的资源利用率

- 更轻松的迁移和扩展

- 更简单的更新管理

- 更快速的启动时间

- 一致的运行环境

  保证开发人员写代码的开发环境和应用程序部署的生产环境的一致性，统一开发测试生产环境

- 持续交付和部署

## Docker 架构

Docker 采用了标准的 C/S 架构，包括客户端和服务端

![Picture1](https://user-images.githubusercontent.com/8086910/55664027-2dc99f80-585a-11e9-8027-cf68453ddf5f.png)

## 核心概念

### Image

镜像类似于虚拟机镜像，可以理解为面向 Docker 引擎的只读模板，是由文件系统叠加而成。镜像是 Docker 运行容器的前提，用户基于镜像来运行容器。

镜像是分层的，AUFS(Advanced Union File System)，Dockerfile 中每运行一条 RUN 指令，镜像添加新的一层。

##### 镜像名
1. 仓库名/镜像名:标签
2. 如果没指定任何标签，Docker 自动为镜像设置一个 latest 标签

##### dangling镜像

dangling 镜像就是 docker images 命令中出现的，REPOSITORY 和 TAG 都显示为 `<none>` 的镜像


### Container

容器类似于一个轻量级的沙箱，Docker 利用容器来运行和隔离应用，容器是镜像的一个运行实例。

### Repository

仓库类似于代码仓库，是 Docker 集中存放镜像文件的地方

每个仓库集中存放一组关联镜像的集合，通过不同的  TAG 来区分，TAG 用来标记来自同一个仓库的不同镜像

### Registry

注册服务器存放不同的仓库



