## Overview

Writing Dockerfiles for Applications

## Containerize  application

要实现应用的容器化，需要考虑两个因素

#### 应用依赖的配置信息

1. 通过环境变量读取配置
2. 通过 volume 读取配置

#### 应用运行的输出日志信息

将应用的输出日志信息重定向到 STDOUT 和 STDERR


