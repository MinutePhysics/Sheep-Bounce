/**
 * PhysicsJS v0.5.3 - 2013-11-25
 * A modular, extendable, and easy-to-use physics engine for javascript
 * http://wellcaffeinated.net/PhysicsJS
 *
 * Copyright (c) 2013 Jasper Palfree <jasper@wellcaffeinated.net>
 * Licensed MIT
 */

(function(e,t){var n=["physicsjs"];if(typeof exports=="object"){var r=n.map(require);module.exports=t.call(e,r[0])}else typeof define=="function"&&define.amd?define(n,function(n){return t.call(e,n)}):e.Physics=t.call(e,e.Physics)})(this,function(e){return e.behavior("edge-collision-detection",function(t){var n="collisions:detected",r=function(n,r,i){var s,o=n.aabb(),u=e.scratchpad(),a=u.transform(),f=u.vector(),l=u.vector(),c=!1,h=[];return s=o.pos.x+o.x-r.max.x,s>=0&&(f.set(1,0).rotateInv(a.setRotation(n.state.angular.pos)),c={bodyA:n,bodyB:i,overlap:s,norm:{x:1,y:0},mtv:{x:s,y:0},pos:n.geometry.getFarthestHullPoint(f,l).rotate(a).values()},h.push(c)),s=o.pos.y+o.y-r.max.y,s>=0&&(f.set(0,1).rotateInv(a.setRotation(n.state.angular.pos)),c={bodyA:n,bodyB:i,overlap:s,norm:{x:0,y:1},mtv:{x:0,y:s},pos:n.geometry.getFarthestHullPoint(f,l).rotate(a).values()},h.push(c)),s=r.min.x-(o.pos.x-o.x),s>=0&&(f.set(-1,0).rotateInv(a.setRotation(n.state.angular.pos)),c={bodyA:n,bodyB:i,overlap:s,norm:{x:-1,y:0},mtv:{x:-s,y:0},pos:n.geometry.getFarthestHullPoint(f,l).rotate(a).values()},h.push(c)),s=r.min.y-(o.pos.y-o.y),s>=0&&(f.set(0,-1).rotateInv(a.setRotation(n.state.angular.pos)),c={bodyA:n,bodyB:i,overlap:s,norm:{x:0,y:-1},mtv:{x:0,y:-s},pos:n.geometry.getFarthestHullPoint(f,l).rotate(a).values()},h.push(c)),u.done(),h},i=function(t,n,i){return r(t,n,i)},s={aabb:null,restitution:.99,cof:1};return{init:function(n){t.init.call(this,n),this.options=e.util.extend({},this.options,s,n),this.setAABB(n.aabb),this.restitution=n.restitution,this._dummy=e.body("_dummy",function(){},{fixed:!0,restitution:this.options.restitution,cof:this.options.cof})},setAABB:function(e){if(!e)throw"Error: aabb not set";e=e.get&&e.get()||e,this._edges={min:{x:e.pos.x-e.x,y:e.pos.y-e.y},max:{x:e.pos.x+e.x,y:e.pos.y+e.y}}},connect:function(e){e.subscribe("integrate:velocities",this.checkAll,this)},disconnect:function(e){e.unsubscribe("integrate:velocities",this.checkAll)},checkAll:function(e){var t=e.bodies,r=e.dt,s,o=[],u,a=this._edges,f=this._dummy;for(var l=0,c=t.length;l<c;l++)s=t[l],s.fixed||(u=i(s,a,f),u&&o.push.apply(o,u));o.length&&this._world.publish({topic:n,collisions:o})}}}),e});