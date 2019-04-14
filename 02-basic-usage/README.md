# Basic Usage

## 如何设置容器默认时区

CentOS
```dockerfile
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
```

Ubuntu
```dockerfile
ENV TZ=Asia/Shanghai
RUN echo $TZ > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata
```

## 如何在构建镜像时使用 SSH 私钥

> resource 与 Dockerfile 为同级目录，id_rsa 为本机的私钥

CentOs
```dockerfile
# COPY credentials on build
COPY resource/id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa && \
      echo 'StrictHostKeyChecking no' >> /etc/ssh/ssh_config


# Remove SSH keys
RUN rm -rf /root/.ssh/
```
Ubuntu
```dockerfile
# COPY credentials on build
COPY resource/id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa && \
      echo "StrictHostKeyChecking no\nUserKnownHostsFile /dev/null" >> /root/.ssh/config

# Remove SSH keys
RUN rm -rf /root/.ssh/
```

