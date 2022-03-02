### 路由跳转的三种方式
- router-link
- Composition API
  - `useRouer`
- JS跳转（传统跳转）
  - `this.$router.push('/welcome');`

### 环境配置
根据环境的不同，需要创建不同的文件
- ---
- 开发环境下，创建一个`.env.dev`的文件
- 生产环境下，创建一个`.env.prod`的文件
- ---

根据不同的环境获取不同的配置，在config/index.js

官方建议：如果需要自定义变量的话，自定义变量需要以`VITE_`开头，这样更安全


 ### mock.js设置
 ### axios二次封装