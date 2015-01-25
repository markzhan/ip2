
# ip2 技术说明

ip2 可以帮助开发人员快速切换自定义 hosts 文件，简化 hosts 文件管理。此外，ip2 还可以显示本机和互联网 ip。ip2 是使用 Node 开发的开源命令行工具，代码托管在 GitHub - https://github.com/markzhan/ip2 。

操作 hosts 文件，需要使用 sudo 执行相关命令，windows 需要管理员权限。此工具不建议非技术人员使用，不要随意使用从网络获取的 hosts 文件。

### 安装
```sh
$ sudo npm i -g ip2
$ ip2 help
```

### 命令表
```
ls [dir]         list hosts
cat [hosts]      print hosts contents
add <file>       add custom hosts to system
use <hosts>      change system hosts to custom hosts
rm <hosts>       delete one custom hosts file
reload           reload used hosts
reset            reset hosts
init             init hosts
info [options]   output system & ip info
help             print help
```

### 命令说明

* `ip2 init` 初始化。备份系统当前 hosts 文件，并将 ip2 hosts 暂存区的 hosts 文件复制到可用 hosts 列表。重复执行此命令会覆盖 hosts 列表中与暂存区同名的 hosts 文件，但不会重复备份系统 hosts 文件。

* `ip2 ls [dir]` 列表 hosts 文件。此命令列出可用的自定义 hosts 文件，支持列出暂存区 hosts 文件和指定目录 hosts 文件，只会列出规范命名的文件。ip2 hosts 文件名格式是 hosts.name.ip2 。
```
ip2 ls  # 列出系统目录 hosts 文件。相当于：
ip2 ls /etc  # 列出系统目录 hosts 文件 (对于 *nix)
ip2 ls %windir%\system32\drivers\etc  # windows hosts 文件

ip2 ls -  # 参数是 - 减号。列出暂存区 hosts 文件
```

* `ip2 cat [name]` 显示 hosts 文件内容。参数是 `ip2 ls` 中显示的名字。此命令先在系统目录查找 hosts 文件，支持显示暂存区 hosts 文件。
```
ip2 cat  # 显示系统当前 hosts 文件内容
ip2 cat <name>  # 显示指定 hosts 文件内容
```

* `ip2 reset` 恢复初始 hosts 文件。恢复 `ip2 init` 备份的 hosts 文件，并清除 `ip2 use` 使用的 hosts 文件标记。

* `ip2 add <file>` 添加 hosts 文件。参数是实际文件路径和文件名。添加自定义 hosts 文件到 hosts 列表，不会覆盖同名 hosts 文件，除非使用 -f 参数。

* `ip2 use <name>` 使用定制 hosts 文件。参数是 `ip2 ls` 列表中的 hosts 名字。启用或切换至指定的 hosts 文件。之后 `ip2 ls` 会发现当前使用的 hosts 名字前有 `>` 标志。

* `ip2 reload` 重载当前 hosts 文件。此命令将之前 `ip2 use` 启用的 hosts 文件重新复制到系统 hosts 文件。比如：可以 `ip2 add` 同名 hosts，然后 `ip2 reload` 重载，从而更新系统当前 hosts 文件内容。

* `ip2 rm <name>` 删除自定义 hosts 文件。物理删除系统目录中自定义的 hosts 文件。参数是 `ip2 ls` 列表中显示的名字，其中有 `>` 标志表示是当前启用的定制 hosts 文件，不能删除。

* `ip2 info` 显示 ip 和系统信息。
```
ip2 info -h  # 子命令帮助信息
ip2 info -l  # 本地 ip 地址
ip2 info -i  # 互联网 ip 地址
ip2 info -s  # 系统信息
ip2 info -l -i -s  # 同时显示
ip2 info -lis  # 支持选项合并简写
```

### 升级与卸载
```sh
$ sudo npm update -g ip2  # 升级
$ sudo npm uninstall -g ip2  # 卸载
```

### 其它

参考和使用了 [TJ](http://www.tjholowaychuk.com/) 大神的 [commander.js](https://github.com/tj/commander.js)，内置 [alsohosts](https://github.com/alsotang/alsohosts)。

没有一种技术可以满足所有时代、所有人的所有需求。TJ 玩 Go，Node 大牛们启动 io.js，失望之余，希望之初。

高山仰止，虽不能至，然心向往之。无论如何，他就在那里。
