![Ecosia Dark Mode](https://i.ibb.co/VNpLj7m/banniere-ecosia-darkmode.png)
# Ecosia Dark-Mode

A simple chrome extension to activate a dark mode to the ecosia search engine. Ecosia is a search engine that uses the profits generated by your online research to plant trees where the need is greatest.
They have a free browser extension for you to save the planet: https://bit.ly/2xmtfVl  
  
[Chrome extension](https://chrome.google.com/webstore/detail/ecosia-dark-mode/lpgjbchlhnpodjjnemfpfajibnclknam?hl=fr) - [Edge extension](https://microsoftedge.microsoft.com/addons/detail/ecosia-darkmode/gebncindnlemmhnigjhkgdfcmaakjcio)

# Installation

It is a very basic chrome extension, enjoy the Chrome documentation to help you.

**Gulp auto compiling separate js/css**  
  
*Node version* : v14.18.*  
*npm version* : 6.14.*  

> npm i  
gulp watch

**After the "gulp watch", work in the "sass" and/or "js" folder.**  
Gulp takes care of compiling into .css and .js files properly.  

### Explanation of compiled files
#### JS 
> `global.js` (use everywhere)  
> `main.js` (use on the \*.ecosia.* pages)  
> `newtab.js` (use in the new tab page)  
> `popup.js` (use in the popup)  
> `vendors.js` (use everywhere) < Contains used js libraries such as jquery  
> `ecosia/main.js` (use in the new tab page) < native ecosia script  

   
#### CSS 
> `main.css` (use for overwrite page css)  
> `newtab.css` (css of the new tab page)  
> `popup.css` (css of the popup)
> `ecosia/main.css` (use in the new tab page) < native ecosia style

**NOTE** : Both .css include "global" folder with globals scss vars/mixins/helpers

For the HTML of the popup, it's simply in ecosia-dark-mode.html

# Contributors

* G. Mirmand #Huroy (developer) | [GitHub](https://github.com/gmirmand)  
* G. Allary (design)
* T. Cobra (concept)

# Ideas

* Switch to allow dark mode to activate itself from a certain time
  * Propose to choose activation slots
* Choose the color variables
