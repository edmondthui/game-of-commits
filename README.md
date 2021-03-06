# Github's Game of Commits

Run this code snippet in the browser console on a Github profile and it will turn your commits into Conway's Game of Life!

This is inspired by bahmutov's Game of Github which was no longer working. I fixed and modernized the code.

![Gif Demo](https://edmondhui.com/game-of-commits/gameofcommits.gif)

## How to play

### In the browser console

Copy this code snippet and run it in the browser console when you're on a Github profile.

```
!function(){let e=[...document.querySelector(".js-calendar-graph-svg").querySelectorAll("g g")],t=e.pop(),n=document.querySelector(".js-yearly-contributions div h2"),l=7,i=52,r=0;function o(e){return[...e.querySelectorAll(".ContributionCalendar-day")].map(e=>(function(e){let t=parseInt(e.getAttribute("data-count"));return{day:e,commits:t,alive:t>0?1:0,next:0}})(e))}[...t.children].forEach(e=>{e.style="display: none"});let a=e.map(e=>o(e));function u(e,t){return e?t>3||t<2?0:1:3===t?1:0}!function e(){if(function(e){for(let t=0;t<i;t++){const n=0===t?i-1:t-1,r=t===i-1?0:t+1;for(let i=0;i<l;i++){const o=0===i?l-1:i-1,a=i===l-1?0:i+1;let c=0;c+=e[n][o].alive,c+=e[n][i].alive,c+=e[n][a].alive,c+=e[t][o].alive,c+=e[t][a].alive,c+=e[r][o].alive,c+=e[r][i].alive,c+=e[r][a].alive,e[t][i].neighbors=c,e[t][i].next=u(e[t][i].alive,c)}}}(a),function(e){let t=["#9BE9A8","#40C463","#30A14E","#216E39"];for(let n=0;n<i;n++)for(let i=0;i<l;i++){let l=t[Math.floor(Math.random()*t.length)];e[n][i].alive?e[n][i].day.setAttribute("style","fill:"+l):e[n][i].day.setAttribute("style","fill: #eeeeee")}}(a),r++,function(e){let t=!1;for(let n=0;n<i;n++)for(let i=0;i<l;i++){const l=e[n][i];l.alive!==l.next&&(t=!0),l.alive=l.next}return t}(a)){let t=`${r} generations`;n.innerText=t,setTimeout(e,300)}else{let e=`Game of commits finished after ${r} generations`;n.innerText=e}}()}();
```

### As a bookmarklet

Go to my website [Github's game of commits](https://edmondhui.com/game-of-commits/)

Follow the instructions on the page:
* Drag the link / bookmarklet on that page onto the bookmark bar
* Go to any Github profile
* Click that bookmarked link

![Gif Demo](https://edmondhui.com/game-of-commits/bookmarkletdemo.gif)
