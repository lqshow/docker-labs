## 数据卷

将宿主机目录或文件挂载到容器内的数据卷

使用 -v 标记可以再容器内创建一个数据卷，多次使用 -v 标记可以创建多个数据卷

#### 在容器内创建一个数据卷

```bash
docker run --rm -it -v /volume alpine /bin/sh
```

#### 挂载一个宿主机目录作为一个数据卷

> 冒号":"前面的目录是宿主机目录，后面的目录是容器内目录。

```bash
# 挂载当前目录
docker run --rm -it -v $(pwd):/volume alpine /bin/sh
docker run --rm -it -v `pwd`:/volume alpine /bin/sh

# 默认挂载读写权限
docker run --rm -it -v ~/Downloads:/volume alpine /bin/sh

# 设置挂载只读权限
docker run --rm -it -v ~/Downloads:/volume:ro alpine /bin/sh
```

## 数据卷容器

使用数据卷容器在容器和主机、容器和容器之间共享数据，并实现数据的备份和恢复

```bash
# 1. 创建一个数据卷容器
docker run --rm -it -v /dbdata --name dbdata ubuntu

# 2. 在其他容器中使用 --volumes-from 来挂载dbdata容器的数据卷 
docker run --rm -it --volumes-from dbdata --name db1 ubuntu
docker run --rm -it --volumes-from dbdata --name db2 ubuntu

# 以上三个容器都挂载同一个数据卷到相同的 /dbdata 目录中。融合一方在该目录下写入，其他容器都可以看到
```

#### 利用数据卷容器迁移数据

```bash
docker run \
	--volumes-from dbdata \
	-v $(pwd):/backup \
	--name worker ubuntu \
	tar cvf /backup/backup.tar /dbdata
```

