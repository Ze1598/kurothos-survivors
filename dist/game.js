export const CHARACTERS = [
 {id:'ignara',name:'Ignara',element:'fire',color:'#f69a60',symbol:'✦',title:'The living flame',description:'Turn the coast to ash with spreading fire and explosive attacks.',trait:'+12% damage · Burns spread through the horde',hp:110,speed:142,damage:1.12},
 {id:'nyxara',name:'Nyxara',element:'ice',color:'#9eddf1',symbol:'❄',title:'The winter sovereign',description:'Pierce the horde with ice and hold your ground inside a killing frost.',trait:'+15% attack area · Ice slows enemies',hp:100,speed:140,damage:1},
 {id:'zephyra',name:'Zephyra',element:'wind',color:'#8bdec2',symbol:'≋',title:'The wandering gale',description:'Cut a path through the horde with wind blades and circling storms.',trait:'+18% movement speed · Wind pushes enemies back',hp:90,speed:168,damage:1},
 {id:'amaris',name:'Amaris',element:'steel',color:'#d0bedf',symbol:'〆',title:'The last blade',description:'Meet the horde at blade’s reach. Wide katana cuts reward close combat.',trait:'+15% critical chance · Critical hits deal double damage',hp:120,speed:145,damage:1},
 {id:'naia',name:'Naia',element:'tide',color:'#ed7e93',symbol:'⌁',title:'The crimson tide',description:'Break the coast beneath a storm of crushing tentacles.',trait:'+30 maximum health · +20% attack area',hp:130,speed:132,damage:1,locked:true}
];
export const WEAPONS = [
 {id:'fireball',owner:'ignara',name:'Fireball',kind:'bolt',element:'fire',symbol:'✦',desc:'Fireballs seek a nearby foe and burst on impact.',damage:23,cooldown:1.15,speed:330,radius:32},
 {id:'cinder',owner:'ignara',name:'Cinder Ring',kind:'aura',element:'fire',symbol:'◉',desc:'A ring of fire burns every enemy within reach.',damage:12,cooldown:.9,radius:76},
 {id:'meteor',owner:'ignara',name:'Flamefall',kind:'strike',element:'fire',symbol:'⋆',desc:'Fire erupts beneath a cluster of enemies.',damage:65,cooldown:3.4,radius:66},
 {id:'shard',owner:'nyxara',name:'Ice Shard',kind:'bolt',element:'ice',symbol:'❄',desc:'Piercing ice shards slow enemies they pass through.',damage:20,cooldown:.95,speed:390,pierce:2},
 {id:'frost',owner:'nyxara',name:'Frost Nova',kind:'aura',element:'ice',symbol:'❋',desc:'A pulse of frost damages and slows surrounding enemies.',damage:23,cooldown:1.6,radius:108},
 {id:'hail',owner:'nyxara',name:'Hailstorm',kind:'strike',element:'ice',symbol:'⁂',desc:'Hail strikes enemy groups, leaving them slowed.',damage:38,cooldown:2.5,radius:89},
 {id:'gale',owner:'zephyra',name:'Gale Blade',kind:'bolt',element:'wind',symbol:'≋',desc:'Wind blades pierce enemies and push them back.',damage:18,cooldown:.8,speed:410,pierce:3},
 {id:'cyclone',owner:'zephyra',name:'Cyclone',kind:'orbit',element:'wind',symbol:'◎',desc:'Circling wind blades cut and repel nearby enemies.',damage:19,cooldown:.65,radius:100},
 {id:'tempest',owner:'zephyra',name:'Tempest',kind:'aura',element:'wind',symbol:'☷',desc:'An outward blast of wind creates room to escape.',damage:25,cooldown:2,radius:132},
 {id:'katana',owner:'amaris',name:'Crescent Cut',kind:'slash',element:'steel',symbol:'〆',desc:'A wide katana slash cuts toward the nearest enemy.',damage:37,cooldown:.85,radius:100},
 {id:'crosscut',owner:'amaris',name:'Crosscut',kind:'slash',element:'steel',symbol:'╳',desc:'Two crossing katana cuts hit enemies in front of you.',damage:53,cooldown:1.45,radius:127},
 {id:'iaido',owner:'amaris',name:'Blade Circle',kind:'aura',element:'steel',symbol:'⟲',desc:'A spinning katana cut hits enemies on every side.',damage:41,cooldown:1.8,radius:105},
 {id:'lash',owner:'naia',name:'Tentacle Lash',kind:'slash',element:'tide',symbol:'⌁',desc:'A sweeping tentacle lashes a broad arc in front.',damage:38,cooldown:1,radius:123},
 {id:'crush',owner:'naia',name:'Tentacle Crush',kind:'strike',element:'tide',symbol:'Ψ',desc:'Tentacles erupt beneath nearby foes and crush them.',damage:68,cooldown:2.8,radius:82},
 {id:'grasp',owner:'naia',name:'Crimson Grasp',kind:'aura',element:'tide',symbol:'❧',desc:'A ring of tentacles pounds and slows nearby foes.',damage:28,cooldown:1.3,radius:93}
];
export const STATS=[
 {id:'might',name:'Might',symbol:'✧',desc:'+12% damage for all attacks.'},
 {id:'haste',name:'Quickening',symbol:'»',desc:'+10% attack speed for all attacks.'},
 {id:'vitality',name:'Vitality',symbol:'♡',desc:'+20 maximum health. Restore 30 health.'},
 {id:'recovery',name:'Renewal',symbol:'✚',desc:'Recover an extra 0.4 health each second.'},
 {id:'magnet',name:'Soul Reach',symbol:'◇',desc:'+25% experience pickup range.'},
 {id:'stride',name:'Fleet Foot',symbol:'↟',desc:'+8% movement speed.'},
 {id:'area',name:'Reach',symbol:'◌',desc:'+12% attack area.'}
];
export const colors=Object.fromEntries(CHARACTERS.map(c=>[c.element,c.color]));
export const weaponById=id=>WEAPONS.find(w=>w.id===id);
const characterById=id=>CHARACTERS.find(c=>c.id===id);
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export const bounds={left:210,right:1310,top:178,bottom:847};
// The surviving pillars at the north and south edge are solid.
export const obstacles=[{x:626,y:179,r:21},{x:906,y:177,r:22},{x:620,y:835,r:23},{x:906,y:842,r:21},{x:1056,y:831,r:18},{x:274,y:794,r:19},{x:1264,y:800,r:20}];
export function freshSave(){return {version:1,gold:0,wins:0,runs:0,best:0,characters:Object.fromEntries(CHARACTERS.map(c=>[c.id,{health:0,attack:0,unlocked:WEAPONS.filter(w=>w.owner===c.id).map(w=>w.id)}]))};}
export function sanitizeSave(raw){
 const clean=freshSave();if(!raw||raw.version!==1)return clean;
 for(const k of ['gold','wins','runs','best'])clean[k]=Number.isFinite(raw[k])?clamp(Math.floor(raw[k]),0,1e8):0;
 for(const c of CHARACTERS){const old=raw.characters?.[c.id];if(!old)continue;const n=clean.characters[c.id];for(const k of ['health','attack'])n[k]=Number.isFinite(old[k])?clamp(Math.floor(old[k]),0,10):0;
 if(Array.isArray(old.unlocked))n.unlocked=[...new Set([...n.unlocked,...old.unlocked.filter(id=>weaponById(id)&&(weaponById(id).owner!=='naia'||clean.wins>0))])];}
 return clean;
}
export function isUnlocked(save,c){return c!=='naia'||save.wins>0;}
export function upgradeCost(save,c,type){return type==='health'?Math.round(70*Math.pow(1.45,save.characters[c].health)):Math.round(90*Math.pow(1.45,save.characters[c].attack));}
export function attackCost(w){return w.kind==='bolt'||w.kind==='slash'?160:220;}
export function buyStat(save,c,type){if(!isUnlocked(save,c)||!['health','attack'].includes(type))return false;const n=save.characters[c];const cost=upgradeCost(save,c,type);if(n[type]>=10||save.gold<cost)return false;save.gold-=cost;n[type]++;return true;}
export function buyAttack(save,c,id){const w=weaponById(id);if(!w||!isUnlocked(save,c)||!isUnlocked(save,w.owner))return false;const n=save.characters[c];if(n.unlocked.includes(id)||save.gold<attackCost(w))return false;save.gold-=attackCost(w);n.unlocked.push(id);return true;}
export class Game {
 constructor(character,starting,save,rng=Math.random){
  this.rng=rng;this.character=characterById(character);if(!this.character||!isUnlocked(save,character))throw Error('Character is locked');
  this.pool=[...save.characters[character].unlocked].filter(id=>isUnlocked(save,weaponById(id)?.owner));if(!this.pool.includes(starting))throw Error('Attack is not unlocked');
  const per=save.characters[character];this.maxHp=this.character.hp+per.health*15;this.hp=this.maxHp;this.damage=this.character.damage*(1+per.attack*.08);
  this.x=768;this.y=512;this.dir=0;this.moving=false;this.speed=this.character.speed;this.area=character==='nyxara'?1.15:character==='naia'?1.2:1;
  this.crit=character==='amaris'?.2:.05;this.stats=Object.fromEntries(STATS.map(s=>[s.id,0]));this.weapons=[{id:starting,level:1,cd:.2}];
  this.state='playing';this.time=0;this.level=1;this.xp=0;this.nextXp=7;this.kills=0;this.gold=0;this.invuln=0;this.spawnCd=0;this.pickups=[];this.enemies=[];this.projectiles=[];this.hostiles=[];this.effects=[];this.texts=[];this.hazards=[];this.milestones=[];this.choices=[];this.events=[];this.nextId=1;this.grid=new Map();this.settled=false;this.finalSpawned=false;
 }
 random(a,b){return a+(b-a)*this.rng();}
 announce(text){this.events.push({type:'announce',text});}
 near(x,y,r){const out=[];for(let gx=Math.floor((x-r)/90);gx<=Math.floor((x+r)/90);gx++)for(let gy=Math.floor((y-r)/90);gy<=Math.floor((y+r)/90);gy++){const a=this.grid.get(gx+','+gy);if(a)for(const e of a)if(e.hp>0&&Math.hypot(e.x-x,e.y-y)<r+e.r)out.push(e);}return out;}
 rebuildGrid(){this.grid.clear();for(const e of this.enemies){if(e.hp<=0)continue;const key=Math.floor(e.x/90)+','+Math.floor(e.y/90);if(!this.grid.has(key))this.grid.set(key,[]);this.grid.get(key).push(e);}}
 nearest(){let nearest=null,d=Infinity;for(const e of this.enemies){if(e.hp<=0)continue;const n=dist(this,e);if(n<d){nearest=e;d=n;}}return nearest;}
 spawn(type='mob',stage=0){
  const a=this.random(0,Math.PI*2),r=this.random(440,610);let x=clamp(this.x+Math.cos(a)*r,bounds.left,bounds.right),y=clamp(this.y+Math.sin(a)*r,bounds.top,bounds.bottom);
  if(Math.hypot(x-this.x,y-this.y)<250){x=this.x<768?bounds.right:bounds.left;y=this.random(bounds.top,bounds.bottom);}
  const minutes=this.time/60;const succ=this.rng()<.37;let hp=(19+minutes*9)*(succ?.8:1);let speed=succ?this.random(48,64):this.random(29,43);speed+=minutes*1.2;
  const boss=type!=='mob';if(boss){hp=type==='final'?14500:stage===1?2400:5300;speed=type==='final'?30:stage===1?30:46;}
  const e={id:this.nextId++,x,y,hp,maxHp:hp,speed,r:boss?type==='final'?42:27:13,sprite:type==='final'?4:boss?(stage===1?2:4):Math.floor(this.rng()*3)+(succ?3:0),type,stage,slow:0,burn:0,burnTick:0,flash:0,cd:boss?2.8:succ?this.random(3,6):99,age:0,damage:boss?26:8+minutes*.8,phase:0};
  this.enemies.push(e);return e;
 }
 makeChoices(){
  const available=[];for(const id of this.pool){const owned=this.weapons.find(w=>w.id===id);if(owned?.level>=5||(!owned&&this.weapons.length>=6))continue;available.push({type:'weapon',id,rank:owned?owned.level+1:1});}
  const statChoices=STATS.map(s=>({type:'stat',id:s.id,rank:this.stats[s.id]+1}));
  const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(this.rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  shuffle(available);shuffle(statChoices);const result=[];
  // A weapon and a stat remain visible whenever a weapon can be offered.
  if(available.length)result.push(available.shift());result.push(statChoices.shift());
  const rest=shuffle([...available,...statChoices]);while(result.length<3&&rest.length)result.push(rest.shift());this.choices=shuffle(result);return this.choices;
 }
 checkLevel(){if(this.xp>=this.nextXp&&this.state==='playing'){this.xp-=this.nextXp;this.level++;this.nextXp=Math.floor(7+this.level*3.5+Math.pow(this.level,1.28));this.state='levelup';this.makeChoices();this.events.push({type:'levelup'});}}
 choose(index){if(this.state!=='levelup'||!this.choices[index])return false;const choice=this.choices[index];if(choice.type==='weapon'){let w=this.weapons.find(w=>w.id===choice.id);if(w)w.level++;else this.weapons.push({id:choice.id,level:1,cd:.1});}else{this.stats[choice.id]++;if(choice.id==='vitality'){this.maxHp+=20;this.hp=Math.min(this.maxHp,this.hp+30);}}
  this.state='playing';this.choices=[];this.events.push({type:'upgrade'});this.checkLevel();return true;
 }
 heal(amount){this.hp=Math.min(this.maxHp,this.hp+amount);}
 hurt(amount){if(this.invuln>0||this.state!=='playing')return;this.hp=Math.max(0,this.hp-amount);this.invuln=.7;this.events.push({type:'hurt'});if(this.hp<=0){this.state='dead';this.events.push({type:'end'});}}
 hit(e,damage,element,dx=0,dy=0){if(e.hp<=0)return;const critical=this.rng()<this.crit;const n=damage*this.damage*(1+this.stats.might*.12)*(critical?2:1);e.hp-=n;e.flash=.08;if(element==='ice'||element==='tide')e.slow=Math.max(e.slow,element==='ice'?1.6:.55);if(element==='fire'){e.burn=2;e.burnDamage=n*.1;}if(element==='wind'){e.x=clamp(e.x+dx*(e.type==='mob'?13:2),bounds.left,bounds.right);e.y=clamp(e.y+dy*(e.type==='mob'?13:2),bounds.top,bounds.bottom);}
  if(this.texts.length<40&&(critical||e.type!=='mob'||this.rng()<.12))this.texts.push({x:e.x,y:e.y-35,text:Math.round(n),life:.6,color:critical?'#ffda88':'#dbe8e9'});
  if(e.hp<=0)this.kill(e);
 }
 kill(e){if(e.dead)return;e.dead=true;this.kills++;this.gold+=e.type==='mob'?.6:e.type==='final'?450:e.stage===1?90:150;
  this.effects.push({kind:'burst',x:e.x,y:e.y-10,r:e.r+5,color:colors[e.type==='final'?'tide':e.sprite<3?'ice':'steel'],life:.25,max:.25});
  if(e.type==='final'){this.state='won';this.events.push({type:'end'});return;}
  const value=e.type==='mob'?(e.sprite>=3?2:1):80;this.pickups.push({x:e.x,y:e.y,value,kind:'xp'});
  if(e.type!=='mob'){this.pickups.push({x:e.x+18,y:e.y,kind:'heal',value:45});this.announce(e.stage===1?'THE WARDEN FALLS':'THE SIREN FALLS');this.events.push({type:'bosskill'});}else if(this.rng()<.012)this.pickups.push({x:e.x,y:e.y,kind:'heal',value:15});
  // Merge excess distant shards without losing their experience value.
  if(this.pickups.length>550){let p=this.pickups.find(p=>p.kind==='xp'&&dist(p,this)>200);if(p){const near=this.pickups.find(q=>q!==p&&q.kind==='xp'&&dist(p,q)<150);if(near){near.value+=p.value;this.pickups.splice(this.pickups.indexOf(p),1);}}}
 }
 cast(owned){
  const w=weaponById(owned.id),rank=owned.level,target=this.nearest();if(!target)return;
  const damage=w.damage*(1+(rank-1)*.45),area=this.area*(1+this.stats.area*.12),radius=(w.radius||10)*(1+(rank-1)*.12)*area;
  const a=Math.atan2(target.y-this.y,target.x-this.x);const amount=1+Math.floor((rank-1)/2);const color=colors[w.element];
  if(w.kind==='bolt'){
   for(let i=0;i<amount;i++){const aim=a+(i-(amount-1)/2)*.18;this.projectiles.push({x:this.x,y:this.y-10,vx:Math.cos(aim)*w.speed,vy:Math.sin(aim)*w.speed,life:2.2,damage,element:w.element,r:w.element==='fire'?7:6,pierce:(w.pierce||1)+Math.floor((rank-1)/2),hit:new Set(),radius:w.element==='fire'?radius:0,color,angle:aim});}
  }else if(w.kind==='strike'){
   for(let i=0;i<amount;i++){const foe=this.enemies.filter(e=>e.hp>0&&dist(this,e)<420);const t=i===0?target:foe[Math.floor(this.rng()*foe.length)]||target;if(w.element==='tide'&&dist(this,t)>190)continue;
    this.effects.push({kind:'strike',x:t.x,y:t.y,r:radius,color,life:.45,max:.45,element:w.element});for(const e of this.near(t.x,t.y,radius))this.hit(e,damage,w.element);}
  }else if(w.kind==='slash'){
   const arc=owned.id==='crosscut'?1.12:1.48;this.effects.push({kind:'slash',x:this.x,y:this.y-7,r:radius,angle:a,arc,color,element:w.element,life:.22,max:.22});
   for(const e of this.near(this.x,this.y,radius)){const angle=Math.atan2(e.y-this.y,e.x-this.x);const diff=Math.atan2(Math.sin(angle-a),Math.cos(angle-a));if(Math.abs(diff)<arc)this.hit(e,damage,w.element,Math.cos(a),Math.sin(a));}
  }else if(w.kind==='orbit'){
   for(let i=0;i<2+Math.floor(rank/2);i++){const angle=this.time*2.5+i*Math.PI*2/(2+Math.floor(rank/2));const x=this.x+Math.cos(angle)*radius,y=this.y+Math.sin(angle)*radius;this.effects.push({kind:'orbit',x,y:y-10,r:20+rank*3,color,life:.65,max:.65,angle});for(const e of this.near(x,y,34+rank*3))this.hit(e,damage,w.element,Math.cos(angle),Math.sin(angle));}
  }else{
   this.effects.push({kind:'ring',x:this.x,y:this.y-7,r:radius,color,element:w.element,life:.42,max:.42});for(const e of this.near(this.x,this.y,radius)){const a=Math.atan2(e.y-this.y,e.x-this.x);this.hit(e,damage,w.element,Math.cos(a),Math.sin(a));}
  }
  this.events.push({type:'cast',element:w.element});
 }
 bossAttack(e){
  const aim=Math.atan2(this.y-e.y,this.x-e.x),final=e.type==='final';e.phase++;
  if(e.phase%3===0){
   const count=final?7:e.stage===1?3:5;for(let i=0;i<count;i++){const x=i===0?this.x:clamp(this.x+this.random(-190,190),bounds.left,bounds.right),y=i===0?this.y:clamp(this.y+this.random(-170,170),bounds.top,bounds.bottom);this.hazards.push({x,y,r:final?62:47,timer:1.45,life:.4,triggered:false,damage:final?32:22});}
  }else{
   const count=final?20:e.stage===1?10:14;for(let i=0;i<count;i++){const a=aim+i*Math.PI*2/count+(e.phase%2)*.13;this.hostiles.push({x:e.x,y:e.y-10,vx:Math.cos(a)*(final?102:82),vy:Math.sin(a)*(final?102:82),life:8,r:final?7:5,damage:final?18:12,color:final?'#fa7399':'#d899d5'});}
  }
  e.cd=final?(e.hp<e.maxHp*.4?1.9:2.7):e.stage===1?3.8:3.1;
 }
 step(dt,input={x:0,y:0}){
  if(this.state!=='playing')return;dt=clamp(dt,0,.05);this.time+=dt;this.invuln=Math.max(0,this.invuln-dt);this.heal(this.stats.recovery*.4*dt);
  const l=Math.hypot(input.x,input.y);this.moving=l>0;if(l){const vx=input.x/l,vy=input.y/l;this.dir=Math.atan2(vy,vx);this.x=clamp(this.x+vx*this.speed*(1+this.stats.stride*.08)*dt,bounds.left,bounds.right);this.y=clamp(this.y+vy*this.speed*(1+this.stats.stride*.08)*dt,bounds.top,bounds.bottom);}
  for(const o of obstacles){const d=dist(this,o),r=o.r+10;if(d<r){const a=Math.atan2(this.y-o.y,this.x-o.x);this.x=clamp(o.x+Math.cos(a)*r,bounds.left,bounds.right);this.y=clamp(o.y+Math.sin(a)*r,bounds.top,bounds.bottom);}}
  for(const [time,stage] of [[300,1],[600,2],[900,3]])if(this.time>=time&&!this.milestones.includes(stage)){this.milestones.push(stage);this.spawn(stage===3?'final':'mini',stage);this.announce(stage===1?'THE DROWNED WARDEN':stage===2?'THE MOURNING SIREN':'NAIA · THE CRIMSON TIDE');this.events.push({type:'boss'});if(stage===3)this.finalSpawned=true;}
  this.spawnCd-=dt;const cap=this.finalSpawned?110:280;if(this.spawnCd<=0&&this.enemies.length<cap){this.spawn();if(this.time>420)this.spawn();this.spawnCd=(this.finalSpawned?.55:Math.max(.18,.8-this.time*.00066));}
  for(const e of this.enemies){if(e.hp<=0)continue;e.age+=dt;e.flash=Math.max(0,e.flash-dt);e.slow=Math.max(0,e.slow-dt);const a=Math.atan2(this.y-e.y,this.x-e.x);const speed=e.speed*(e.slow>0?.42:1);e.x+=Math.cos(a)*speed*dt;e.y+=Math.sin(a)*speed*dt;
   for(const o of obstacles){const d=dist(e,o);if(d<o.r+e.r){const angle=Math.atan2(e.y-o.y,e.x-o.x);e.x=o.x+Math.cos(angle)*(o.r+e.r);e.y=o.y+Math.sin(angle)*(o.r+e.r);}}
   if(e.burn>0){e.burn-=dt;e.burnTick-=dt;if(e.burnTick<=0){e.burnTick=.5;e.hp-=e.burnDamage||2;if(e.hp<=0)this.kill(e);}}
   if(e.hp<=0)continue;if(dist(this,e)<e.r+10)this.hurt(e.damage);if(this.state!=='playing')return;e.cd-=dt;
   if(e.type!=='mob'&&e.cd<=0)this.bossAttack(e);else if(e.type==='mob'&&e.sprite>=3&&e.cd<=0&&dist(this,e)<420){this.hostiles.push({x:e.x,y:e.y-12,vx:Math.cos(a)*88,vy:Math.sin(a)*88,life:5,r:4,damage:7,color:'#c698e7'});e.cd=this.random(5,8);}
  }
  this.enemies=this.enemies.filter(e=>e.hp>0);this.rebuildGrid();
  for(const owned of this.weapons){owned.cd-=dt;if(owned.cd<=0){this.cast(owned);owned.cd=weaponById(owned.id).cooldown/(1+this.stats.haste*.1)/(1+(owned.level-1)*.055);if(this.state!=='playing')return;}}
  for(const p of this.projectiles){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.life<=0)continue;for(const e of this.near(p.x,p.y,p.r+6)){if(p.hit.has(e.id))continue;p.hit.add(e.id);this.hit(e,p.damage,p.element,p.vx/400,p.vy/400);p.pierce--;if(p.radius){this.effects.push({kind:'burst',x:p.x,y:p.y,r:p.radius,color:p.color,life:.3,max:.3});for(const other of this.near(p.x,p.y,p.radius))if(other.id!==e.id)this.hit(other,p.damage*.6,p.element);}if(p.pierce<=0){p.life=0;break;}}if(this.state!=='playing')return;}
  this.projectiles=this.projectiles.filter(p=>p.life>0);for(const p of this.hostiles){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;if(dist({x:this.x,y:this.y-8},p)<p.r+9){this.hurt(p.damage);p.life=0;}}this.hostiles=this.hostiles.filter(p=>p.life>0);if(this.state!=='playing')return;
  for(const h of this.hazards){h.timer-=dt;if(h.timer<=0&&!h.triggered){h.triggered=true;this.effects.push({kind:'strike',x:h.x,y:h.y,r:h.r,color:'#f67195',life:.4,max:.4,element:'tide'});if(dist(this,h)<h.r+8)this.hurt(h.damage);}if(h.triggered)h.life-=dt;}this.hazards=this.hazards.filter(h=>!h.triggered||h.life>0);if(this.state!=='playing')return;
  const magnet=48*(1+this.stats.magnet*.25);for(const p of this.pickups){const d=dist(this,p);if(d<magnet||p.pulling){p.pulling=true;const a=Math.atan2(this.y-p.y,this.x-p.x);p.x+=Math.cos(a)*Math.max(180,d*5)*dt;p.y+=Math.sin(a)*Math.max(180,d*5)*dt;if(d<14){p.taken=true;if(p.kind==='xp')this.xp+=p.value;else{this.heal(p.value);this.events.push({type:'heal'});}}}}
  this.pickups=this.pickups.filter(p=>!p.taken);for(const e of this.effects)e.life-=dt;this.effects=this.effects.filter(e=>e.life>0).slice(-180);for(const t of this.texts){t.life-=dt;t.y-=22*dt;}this.texts=this.texts.filter(t=>t.life>0);this.checkLevel();
 }
 settle(save){if(this.settled||!['dead','won','abandoned'].includes(this.state))return false;this.settled=true;save.gold+=Math.floor(this.gold);save.runs++;save.best=Math.max(save.best,Math.floor(this.time));if(this.state==='won')save.wins++;return true;}
}
