
## 0.3.0 (2015-01-26)
- ADD - 增加 ip 地址 CIDR/Subnet 计算功能
- ADD - 增加 ip 地址 LongInt 互转功能
- ADD - 增加 Private ip 判断功能
- ADD - 增加 ip 地址取反功能
- ADD - 增加 ip 网段计算功能

## 0.2.10 (2015-01-25)
- ADD - use 当前 hosts 时提示正在使用

## 0.2.8 (2015-01-24)
- ADD - 回显 add hosts 名字
- FIX - 修复 windows 兼容性 bug

## 0.2.5 (2015-01-23)
- NEW - 系统信息查看命令 - info
- UPD - 全局选项 -i -l 移至 info 选项
- UPD - 移除 add 命令加目录文件到 hosts 功能

## 0.2.1 (2015-01-22)
- NEW - hosts 初始化命令 - init
- NEW - 显示 hosts 内容命令 - cat
- ADD - list 命令列出内置与指定目录 hosts 文件
- ADD - 选项 -f 在 hosts 文件操作时覆盖同名文件
- UPD - add 无参数取消，功能移至 init 命令
- ADD - add 命令添加指定目录 hosts 文件

## 0.2.0 (2015-01-21)
- NEW - 增加 hosts 目录和 alsohosts
- ADD - add 命令无参数时，add hosts 目录文件

## 0.1.5 (2015-01-20)
- NEW - hosts 管理命令 - reload、reset

## 0.1.1 (2015-01-19)
- NEW - hosts 文件管理命令 - ls、add、use、del

## 0.1.0 (2015-01-18)
- 查询本地 ip - 选项 -l
- 查询互联网 ip - 选项 -i
