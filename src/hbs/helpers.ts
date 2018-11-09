const hbs = require('hbs');

//helpers
hbs.registerHelper('getAnio', () =>{
    return new Date().getFullYear();
});

// hbs.registerHelper('subMenu', (data: any, key: any) => {
//     let subData = data.find((x: any) => x.IdTipo == key);
//     console.log(subData);
//     return subData;
// });

// hbs.registerHelper("select", function(value: any, options: any) {
//     return options.fn(this).split('\n').map(function(v: any) {
//         var t = 'value="' + value + '"'
//         return ! RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
//       }).join('\n');
//   });