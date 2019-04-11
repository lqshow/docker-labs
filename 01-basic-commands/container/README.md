## 创建启动容器
```bash
# 创建随机名容器，并运行 centos 的终端
# 1. 检查本地是否存在centos镜像，不存在，链接到 docker hub，自动下载到本地宿机
# 2. 如果不指定一个镜像的版本标签，如下只使用 centos，Docker 将默认使用 centos:latest 镜像
# 3. 容器的命名必须是唯一的
docker run -it centos /bin/bash

# 创建一个名为test的容器
docker run -it —-name test centos /bin/bash

# 后端运行并映射80端口
docker run -d -p 80:80 --name app_port basebit/xdp-sdk-jre8

# 设置环境变量
docker run --rm -it --name test \
--env MYHOME=/home \
--env TEST=/home \
--env PATH=$PATH:/home \
centos bash

# 运行多条指令
docker run -d  \
 --restart always \
 -p 13200:13200 \
 --volume /root/.m2:/root/.m2  \
 --env NODE_ENV=test  \
 enigma:0.0.1 \
 /bin/sh -c 'cd /data/project/service; npm run build-xfs; ./bin/start.sh'
```

#### 启动参数
| options | desc                            |
| ------- | ------------------------------- |
| -i      | 保证容器中的 STDIN 是开启的     |
| -t      | 为要创建的容器分配一个伪 tty 终端 |
| -d/--detach | 后台运行容器，并返回容器 ID     |
| --name   | 指定容器名称                    |
| -e/--env | 配置容器内的环境变量             |
| --link  | 链接到另外一个容器              |
| --rm | 当容器退出时自动删除它 |
| -v/--volume | 挂载数据卷(映射的卷)，可以使用多次，即挂载多个数据卷 |
| --restart | 重启策略( unless-stopped\|always) |
| -p/--publish | 把容器端口映射到主机端口 |
| -P | 对外公开在 Dockerfile 中的 EXPOSE 指令中设置的所有端口 |
| --hostname | 设置容器host |
## 查看容器

```bash
# 列出正在运行的容器
docker ps

# 列出全部容器
docker ps -a

# 列出最后一次运行的容器
docker ps -l

# 获取容器元数据
docker inspect CONTAINER
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' CONTAINER

# 查看容器进程
docker top CONTAINER

# 查容器的端口映射
docker port CONTAINER
```

## 容器日志
```bash
# 跟踪日志输出, 效果类似于tail -f
docker logs -f CONTAINER

# 获取日志最后10行
docker logs --tail 10 CONTAINER 

# 获取最新日志
docker logs -ft --tail 0 CONTAINER

# 匹配日志
docker logs CONTAINER 2>&1| grep "ERROR"
```

## 容器操作

```bash
# 从容器里拷贝文件到本地
docker cp a136a050da25:/home/file.txt ./

# 从本地拷贝文件到容器里
docker cp Dockerfile xdp-workspace-api:/data/project/service/logs/workspace/

# 容器重名
docker rename CONTAINER NEW_NAME

# 停止、启动、杀死、重启一个容器  
docker stop CONTAINER
docker start CONTAINER
docker kill CONTAINER
docker restart CONTAINER
```

## 附加进入容器
#### 附加到一个运行的容器上面(前提是此Container已经运行中)
> 命令输完后，需按下回车才能进入该会话
> 退出容器(不关闭容器)：Ctrl+P+Q
> 退出容器(关闭)：exit

```bash
docker attach CONTAINER
```

## 运行交互式的容器

```bash
# 在容器中打开交互式任务
docker exec -it a136a050da25 /bin/bash

# 以 root 权限进入容器
docker exec -it -u root docker-jenkins /bin/bash

# 在容器内创建空文件
docker exec -d a136a050da25 touch /home/new_file

# 查看环境变量
docker exec -it 7984cfc7d174 env

# 查看host文件
docker exec -it 7984cfc7d174 cat /etc/hosts
```

## 导入导出

#### 导出容器快照到本地镜像

导出一个已经创建的容器到一个文件

```bash
docker export CONTAINER > XOS.tar
```

#### 导入容器快照为镜像

导出的文件可以使用 docker import 命令导入，成为镜像。

通过该方式导入，仅保存容器当时的快照状态，需要重新指定标签等元数据信息。

```bash
# 本地容器
cat XOS.tar | docker import - lqshow/test:v1.0

# 网络容器
docker import http://example.com/exampleimage.tgz lqshow/test:v2.0
```

## 删除容器
> 运行中的容器是不能删除的，必须先stop或者kill

```bash
# 删除单个容器
docker stop CONTAINER && docker rm CONTAINER

# 删除所有容器
docker rm 'docker ps -a -q'

# 删除所有退出的容器
docker stop $(docker ps -a | grep "Exited" | awk '{print $1 }')
docker rm $(docker ps -a | grep "Exited" | awk '{print $1 }')
```

