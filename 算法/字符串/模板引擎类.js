class SimpleTemplateEngine {
    constructor() {
        //缓存住已经解析过的字符串
      this.cache = {};
    }
  
    /**
     * 编译模板
     * @param {string} template 模板字符串
     * @return {function} 渲染函数
     */
    compile(template) {
      // 检查缓存
      if (this.cache[template]) {
        return this.cache[template];
      }
  
      // 处理各种模板语法
      let code = 'let output = [];\n';
      let cursor = 0;
      const tokens = template.split(/(\{\{\/?\w+\}\})/);
  
      tokens.forEach(token => {
        if (token.match(/^\{\{(\w+)\}\}$/)) {
          // 变量替换 {{variable}}
          const variable = token.slice(2, -2).trim();
          code += `output.push(data['${variable}'] || '');\n`;
        } else if (token.match(/^\{\{#if (\w+)\}\}$/)) {
          // 条件开始 {{#if condition}}
          const condition = token.slice(5, -2).trim();
          code += `if (data['${condition}']) {\n`;
        } else if (token === '{{/if}}') {
          // 条件结束 {{/if}}
          code += '}\n';
        } else if (token.match(/^\{\{#each (\w+)\}\}$/)) {
          // 循环开始 {{#each array}}
          const arrayName = token.slice(7, -2).trim();
          code += `
            if (data['${arrayName}'] && Array.isArray(data['${arrayName}'])) {
              data['${arrayName}'].forEach(function(item) {
                var __temp = data;
                data = item;
          `;
        } else if (token === '{{/each}}') {
          // 循环结束 {{/each}}
          code += `
                data = __temp;
              });
            }
          `;
        } else if (token) {
          // 普通文本
          code += `output.push(\`${token.replace(/`/g, '\\`')}\`);\n`;
        }
      });
  
      code += 'return output.join("");';
      
      // 创建并缓存渲染函数
      const render = new Function('data', code);
      this.cache[template] = render;
      
      return render;
    }
  
    /**
     * 渲染模板
     * @param {string} template 模板字符串
     * @param {object} data 数据对象
     * @return {string} 渲染结果
     */
    render(template, data) {
      const renderFn = this.compile(template);
      return renderFn(data || {});
    }
  }

  const engine = new SimpleTemplateEngine();

// 示例1: 基本变量替换
const template1 = 'Hello, {{name}}! Today is {{day}}.';
const data1 = { name: 'Alice', day: 'Monday' };
console.log(engine.render(template1, data1));
// 输出: Hello, Alice! Today is Monday.

