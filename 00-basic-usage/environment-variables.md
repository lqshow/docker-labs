### 环境变量设置

#### 1. 通过 Dockerfile 设置
```dockerfile
FROM node:alpine
# 设置单个环境变量
ENV NODE_ENV test

# 同时设置多个环境变量
ENV RUBY_MAJOR=2.4 \
    RUBY_VERSION=2.4.1
```
查看容器中的环境变量
```bash
➜  /Users/linqiong/workspace/docker/example docker run -it --rm example env

PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=45804cf45f6f
TERM=xterm
NODE_ENV=test
HOME=/root
```
#### 2. 通过docker run命令中的-e或--env值来设置环境变量
> 这里传递的环境变量值会覆盖掉 Dockerfile 中设置的环境变量值
```bash
docker run \
	-it \
	--rm \
	-e NODE_ENV=production \
	-e HADOOP_HOME=/opt/hadoop/current \
	example env
```
查看执行结果
```bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=2f2a77b3dfea
TERM=xterm
NODE_ENV=production
HADOOP_HOME=/opt/hadoop/current
HOME=/root
```
#### 3.配置环境变量文件， 再通过docker run命令中的--env-file参数传入
> 该方法的好处是可以不将环境变量的值暴露出去
1. 创建.env配置文件
```bash
echo "NODE_ENV=production\nKAFKA_HOME=/opt/kafka/current" > .env
```
2. 执行docker run命令
```bash
docker run -it --rm --env-file ./.env example env
```
3. 查看执行结果
```bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=17ec8d22fad8
TERM=xterm
NODE_ENV=production
KAFKA_HOME=/opt/kafka/current
HOME=/root
```