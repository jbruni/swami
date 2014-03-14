# Swami

Smart Web Access Methods Interface is my thin and light toolset to make Ajax requests
from a client-side front-end AngularJS app running in the browser to communicate with
the server-side back-end.

I have used angular-resource (`$resource`), and then I have tried
[Restangular](https://github.com/mgonto/restangular) and 
[NgActiveResource](https://github.com/FacultyCreative/ngActiveResource),
both amazing projects which may be the best fit for many people.

For me, they offered tons of features I didn't need, while the simple and straight
things I needed were not available on them. For example, returning a dictionary 
instead of an array from the server - instead of dealing with workarounds and
having to deal with arrays, I just wanted to play nicely with my dictionaries.

So, I've started to build my humble solution for my basic needs...

## Install

Install with `bower`:

```shell
bower install swami
```

Add a `<script>` to your `index.html`:

```html
<script src="/bower_components/swami/dist/swami.js"></script>
```

And add `Swami` as a dependency for your app:

```javascript
angular.module('myApp', ['Swami']);
```

## Documentation

Documentation is available in the
[docs folder](http://github/jbruni/swami/tree/master/docs).

## License

The MIT License

Copyright (c) 2014 J Bruni http://github.com/jbruni

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.