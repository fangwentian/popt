# popt
> POP toolkit. 用于pop front-end工程中，新建页面时，一键自动生成基础文件，包括：proxyRule里的规则，同步假数据文件，页面ftl，nej入口文件entry.js，根组件文件page.js，根组件模板文件page.html

##### 用法及注意事项
1. 全局安装本工具：npm i popt -g

2. 将popt.config文件夹复制到front-end项目根目录

3. 在front-end项目根目录执行命令：pt -p pop -u marketing/coupon, 其中p后面的参数为工程名，可以是pop, cms, bms等，u后面的参数是要新添加的页面的url。 