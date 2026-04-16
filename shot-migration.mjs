import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({viewport:{width:1440,height:900}});
await p.goto('file:///sessions/quirky-great-gauss/m4b-site/index.html',{waitUntil:'networkidle'});
await p.waitForTimeout(1500);
await p.evaluate(()=>{
  const el = document.querySelector('#migration');
  if(el) el.scrollIntoView({behavior:'instant',block:'start'});
});
await p.waitForTimeout(500);
await p.screenshot({path:'/sessions/quirky-great-gauss/migration-section.png'});
await b.close();
console.log('OK');
