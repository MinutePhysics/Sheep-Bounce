/**
 * PhysicsJS v0.5.3 - 2013-11-25
 * A modular, extendable, and easy-to-use physics engine for javascript
 * http://wellcaffeinated.net/PhysicsJS
 *
 * Copyright (c) 2013 Jasper Palfree <jasper@wellcaffeinated.net>
 * Licensed MIT
 */

(function(e,t){var n=["physicsjs"];if(typeof exports=="object"){var r=n.map(require);module.exports=t.call(e,r[0])}else typeof define=="function"&&define.amd?define(n,function(n){return t.call(e,n)}):e.Physics=t.call(e,e.Physics)})(this,function(e){return e.behavior("sweep-prune",function(t){function o(e,t){return e===t?!1:e>t?e<<16|t&65535:t<<16|e&65535}var n="collisions:candidates",r=1,i=function(){return r++},s={x:0,y:1};return{init:function(e){t.init.call(this,e),this.clear()},clear:function(){this.tracked=[],this.pairs=[],this.intervalLists={};for(var e in s)this.intervalLists[e]=[]},connect:function(e){e.subscribe("add:body",this.trackBody,this),e.subscribe("remove:body",this.untrackBody,this),e.subscribe("integrate:velocities",this.sweep,this);var t=e.getBodies();for(var n=0,r=t.length;n<r;++n)this.trackBody({body:t[n]})},disconnect:function(e){e.unsubscribe("add:body",this.trackBody),e.unsubscribe("remove:body",this.untrackBody),e.unsubscribe("integrate:velocities",this.sweep),this.clear()},broadPhase:function(){return this.updateIntervals(),this.sortIntervalLists(),this.checkOverlaps()},sortIntervalLists:function(){var e,t,n,r,i,o,u,a,f;for(var l in s){e=this.intervalLists[l],n=0,t=e.length,f=s[l];while(++n<t){i=e[n],o=i.val.get(f),r=n,u=e[r-1],a=u&&u.val.get(f);while(r>0&&(a>o||a===o&&u.type&&!i.type))e[r]=u,r--,u=e[r-1],a=u&&u.val.get(f);e[r]=i}}},getPair:function(e,t,n){var r=o(e.id,t.id);if(r===!1)return null;var i=this.pairs[r];if(!i){if(!n)return null;i=this.pairs[r]={bodyA:e.body,bodyB:t.body,flag:0}}return i},checkOverlaps:function(){var e,t,n,r,i,o,u,a,f,l,c=s.z||s.y||s.x,h=[],p=0,d=[];for(var v in s){e=v==="x",o=this.intervalLists[v],a=-1,u=o.length;while(++a<u){i=o[a],n=i.tracker;if(i.type){f=p;while(--f>=0)r=h[f],r===n?(f<p-1?h[f]=h.pop():h.pop(),p--):(l=this.getPair(n,r,e),l&&(l.flag=e?0:l.flag+1,l.flag===c&&d.push(l)))}else p=h.push(n)}}return d},updateIntervals:function(){var t,n,r=e.scratchpad(),i=r.vector(),s=r.vector(),o=this.tracked,u=o.length;while(--u>=0)t=o[u],n=t.interval,i.clone(t.body.state.pos),s.clone(t.body.aabb()),n.min.val.clone(i).vsub(s),n.max.val.clone(i).vadd(s);r.done()},trackBody:function(t){var n=t.body,r={id:i(),body:n},o={min:{type:!1,val:e.vector(),tracker:r},max:{type:!0,val:e.vector(),tracker:r}};r.interval=o,this.tracked.push(r);for(var u in s)this.intervalLists[u].push(o.min,o.max)},untrackBody:function(e){var t=e.body,n,r,i=this.tracked,o,u;for(var a=0,f=i.length;a<f;++a){o=i[a];if(o.body===t){i.splice(a,1);for(var l in s){u=0,n=this.intervalLists[l];for(var c=0,h=n.length;c<h;++c){r=n[c];if(r===o.interval.min||r===o.interval.max){n.splice(c,1),c--,f--;if(u>0)break;u++}}}break}}},sweep:function(e){var t=this,r=e.bodies,i=e.dt,s;s=t.broadPhase(),s.length&&this._world.publish({topic:n,candidates:s})}}}),e});