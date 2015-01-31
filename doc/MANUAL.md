
# ip2 使用说明

ip2 是一个命令行工具，支持 Mac OS X, Linux, Windows。主要功能包括：ip 地址计算；快速切换自定义 hosts 文件；查询本机和互联网 ip 信息。ip2 使用 Node 开发，代码托管在 GitHub - https://github.com/markzhan/ip2 。

### 安装
```
$ sudo npm i -g ip2  # install
$ sudo npm update -g ip2  # upgrade
```
如果没有安装 Node.js 和 npm，可以去 [Node 官网](http://nodejs.org/) 下载安装包安装。

### 命令表
```
ls [dir]        list hosts
cat [hosts]     print hosts contents
add <file>      add custom hosts to system
use <hosts>     change system hosts to custom hosts
rm <hosts>      delete one custom hosts file
reload          reload used hosts
reset           reset hosts
init            init hosts
help            help & example
*               ip utilities
```

### 选项表
```
-h, --help      output usage information
-V, --version   output the version number
-v, --version   get version number
-f, --force     overwrite file
-l, --local     get local ip
-s, --system    get system info
-i, --internet  get internet ip info
```

### IP 地址计算
```
ip2 24  # 255.255.255.0
ip2 127.0.0.1  # ipv4 to long
ip2 2130706433  # long to ipv4
ip2 '! 255.255.255.0'  # 0.0.0.255
ip2 '192.168.1.134 or 0.0.0.255'  # 192.168.1.255
ip2 '192.168.1.134 mask 255.255.255.0'  # 192.168.1.0
ip2 '192.168.1.134 subnet 255.255.255.192'  # subnet information
ip2 192.168.1.134/26  # CIDR subnet, same as previous
```

### HOSTS 文件管理

* `ip2 init` 初始化。备份系统当前 hosts 文件，并将 ip2 hosts 暂存区的 hosts 文件复制到可用 hosts 列表。重复执行此命令会覆盖 hosts 列表中与暂存区同名的 hosts 文件，但不会重复备份系统 hosts 文件。

* `ip2 ls [dir]` 列表 hosts 文件。此命令列出可用的自定义 hosts 文件，缺省显示系统区 hosts 文件列表，支持暂存区和指定目录 hosts 文件列表，只会列出规范命名的文件。ip2 hosts 文件名格式是 `hosts.<name>.ip2` 。
```
ip2 ls  # 列出系统目录 hosts 文件
# 相当于：
ip2 ls /etc  # 列出系统目录 hosts 文件 (对于 *nix)
# or
ip2 ls %windir%\system32\drivers\etc  # windows hosts 文件
# 查看内置 hosts 文件
ip2 ls -  # 参数是 - 减号。列出暂存区内置 hosts 文件
```

* `ip2 cat [name]` 显示 hosts 文件内容。缺省显示系统当前 hosts 文件内容。参数是 `ip2 ls` 中显示的名字。此命令先在系统目录查找 hosts 文件，支持显示暂存区 hosts 文件。
```
ip2 cat  # 显示系统当前 hosts 文件内容
ip2 cat <name>  # 显示指定 hosts 文件内容
```

* `ip2 reset` 恢复初始 hosts 文件。恢复 `ip2 init` 备份的 hosts 文件，并清除 `ip2 use` 使用的 hosts 文件标记。

* `ip2 add <file>` 添加 hosts 文件。参数是实际文件路径和文件名。添加自定义 hosts 文件到 hosts 列表，不会覆盖同名 hosts 文件，除非使用 -f 参数。

* `ip2 use <name>` 使用定制 hosts 文件。参数是 `ip2 ls` 列表中的 hosts 名字。启用或切换至指定的 hosts 文件。之后 `ip2 ls` 会发现当前使用的 hosts 名字前有 `>` 标志。

* `ip2 reload` 重载当前 hosts 文件。此命令将之前 `ip2 use` 启用的 hosts 文件，即当前使用的定制 hosts 文件重新复制到系统 hosts 文件。比如：可以 `ip2 add <name> -f` 添加修改后的同名 hosts，然后 `ip2 reload` 重载，从而更新系统当前 hosts 文件。

* `ip2 rm <name>` 删除自定义 hosts 文件。物理删除系统目录中自定义的 hosts 文件。参数是 `ip2 ls` 列表中显示的名字，其中有 `>` 标志表示是当前启用的定制 hosts 文件，不能删除。

提示：操作 hosts 文件，需要使用 sudo 执行相关命令，Windows 需要管理员权限。不要随意使用从网络获取的 hosts 文件。

### 查 IP、域名和系统信息
```
ip2 qq.com    # get dns information - 查域名信息
ip2 8.8.8.8   # get ip geo location - 查互联网IP信息
ip2 -l        # get local ip
ip2 -s        # get system info
ip2 -i        # get internet ip info
ip2 -l -i -s  # get ip & system info
ip2 -lis      # same as previous
```

### 其它

参考和使用了 [TJ大神](http://www.tjholowaychuk.com/) 的 [commander.js](https://github.com/tj/commander.js)，内置 [alsohosts](https://github.com/alsotang/alsohosts)。
