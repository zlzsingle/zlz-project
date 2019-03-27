## 控制器
控制器层负责处理传入的<b>请求</b>, 并返回对客户端的<b>响应</b>。

<img src="./files/1.jpg" />

控制器的目的是接受应用的特定请求.<b>路由</b>机制控制那个控制器接受那些请求.通常,每个控制器有多个路由,不同的路由可以执行不同的操作.

为了创建一个基本的控制器，我们必须使用`装饰器`。装饰器将类与所需的元数据关联，并使Nest能够创建路由映射（将请求绑定到相应的控制器）。

## 路由
在下面的例子中，我们使用了定义基本控制器所需的 `@Controller('cats')` 装饰器。我们将可选前缀设置为 `cats`。使用前缀可以避免在所有路由共享通用前缀时出现冲突的情况。

> cats.controller.ts

```typescript 
	
	import { Controller, Get } from '@nestjs/common';

	@Controller('cats')
	export class CatsController {
	  @Get()
	  findAll() {
	    return 'This action returns all cats';
	  }
	}

```
<p style="background: rgba(66,185,131,.1);">
   &nbsp;&nbsp;
   要使用 CLI 创建控制器，只需执行 `$nest g controller cats` 命令。
</p>

`findAll()` 方法前的 `@Get()` 修饰符告诉 Nest 创建此路由路径的端点，并将每个相应的请求映射到此处理程序。由于我们为每个路由（`cats`）声明了前缀，所以 Nest 会在这里映射每个 `/cats` 的 <b>GET</b> 请求。

当客户端调用此端点时, Nest 将返回 200 状态码和解析的 JSON, 在本例中只是个字符串。这怎么可能？有`两种`可能的方法来处理响应：
