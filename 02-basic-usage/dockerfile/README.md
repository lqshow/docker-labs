## 镜像的安全性

> 需遵循打包的最佳方法

构建镜像时建议不要 copy 密码，即使 copy 了，在使用完毕后，也需要在当前层最后做删除操作。

如果文件在某一层做删除，其实在上一层中该文件仍然存在，仍然占用空间，任何人都可以使用工具来访问它，比如  dive。(需要记住的是，在系统后续层中删除的文件仍然存在于镜像中，它们只是变得难以访问而已)

## 优化镜像大小

一般来说，我们希望按照从最不可能发生变化到最有可能发生变化的顺序来为镜像层排序，以针对推送和拉取操作优化镜像的大小。

[参见：reduce docker image sizes ](../../04-reduce-docker-image-sizes)

## Dockerfile

### ENTRYPOINT

配置容器启动后执行的命令， ENTRYPOINT 不会被 docker run 提供的参数覆盖

每个 Dockerfile 只能有一个 ENTRYPOINT，当指定多个 ENTRYPOINT 时，只有最后一个生效

### ONBUILD

配置当所创建的镜像作为其他新创建镜像的基础镜像时，所执行的操作命令。

其他新镜像会自动执行 ONBUILD 指令的内容。

## Reference

- Kubernetes: Up & Running