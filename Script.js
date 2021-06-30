console.log("Hi")
var c = document.getElementById("canv");
c.height=400
c.width=400
var ctx =c.getContext("2d")
const framerate=60
class Particle{
  constructor(x,y,r,color){
    this.x=x
    this.y=y
    this.position={x:x,y:y}
    this.radius=r || 0;
    this.color=color || "#ddd" ;
  }
  
  draw(){
    //console.log(this.position.x)
    ctx.fillStyle=this.color
    ctx.beginPath();
    ctx.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI,false);
    ctx.fill();
    
  }
  
}

//var p=new Particle(50,50,6)

const simu1=function(vel){
  var particles=[]
  var platespeed=0.1
  const particlescount=30
  const shift= 20
  const pradius= 5
  const pyoffset=0
  const pcolorr=0
  const hslrangeh=[pcolorr,360]
  var vstr=vel
  this.start=function(){
    console.log(vstr)
    console.log('simu1 here')
    var pcolor;
    for (let j=0 ;j<particlescount;j++){
      for (let i=0;i<particlescount;i++){
      //pcolor="#"+(j*shift*50).toString().slice(0,2)+"f";
         var xpos=j*shift
        var ypos=(i)*shift
        pcolor="hsl("+(hslrangeh[0]+(xpos/c.width*hslrangeh[1])).toString().slice(0,3)+",100%,"+(xpos+35)/c.width*70+"%)"
         if (j*shift<=c.width)
          particles.push(new Particle(xpos,ypos,pradius,pcolor))
      }
    }
    console.log(particles.length)
  }
  this.process=function(delta){
    ctx.clearRect(0,0,c.width,c.height)
    particles.forEach((ptcl,indx)=>{
        let v=!vstr?Math.pow(ptcl.position.y,2)*platespeed:eval(vstr)
        v*=delta
       // console.log(vstr,v)
      if( ptcl.position.x>c.width || ptcl.position.x <0){
        //particles.pop(indx);
        //delete ptcl;
        ptcl.position.x=ptcl.position.x-(c.width*Math.sign(ptcl.position.x))+v
        ptcl.draw()
      }
      else{
      ptcl.position.x+=v
      ptcl.radius+=0
      ptcl.draw()
      //console.log(v)
      
        }
       // pcolor="hsl("+(hslrangeh[0]+(ptcl.x/c.width*hslrangeh[1])).toString().slice(0,3)+",100%,"+(ptcl.x+20)/c.width*ptcl.x+"%)"
       // ptcl.color=pcolor
        //ptcl.position.x+=60*delta
      })
      //console.log(particles.length)
  }
  this.npause=function(){
    platespeed=platespeed<=0.0001||!platespeed?0.1:platespeed*0.1
  }
  this.rewind=function(){
    platespeed*=-1
  }
}


const drawfn=function(fx,xrg,yrg,xstep,ofx,ofy,dt){
  this.ranx=xrg || [0,canv.width]
  this.rany=yrg || [0,canv.height]
  this.offset={x:ofx||0,y:ofy||canv.height}
  this.xstep=xstep||10
  this.oldpoint={x:0,y:0}
  this.fx=fx||'x'
  this.spd=10
  this.drawer=new Particle(0,0,1,'#0f5')
  this.deltacont=0
  this.deltalimit=dt||0.05*1
  this.speed=1
  this.start=function(){
    console.log('hi from drawfn')
    this.makeAxes()
    
  }
  this.process=function(delta){
    
    let newpoint={x:this.oldpoint.x+this.xstep,y:0}
    let x = newpoint.x*this.speed
    newpoint.y=eval(this.fx)
    //console.log(newpoint.y,x)
    if((x+this.offset.x)<canv.width){
      let clr='#'+Math.abs((newpoint.y)*90).toString().substring(0,1)+'f0'//'hsl('+Math.abs(x)+','+170+',50)'
      this.drawLine(newpoint,this.oldpoint,clr,1.0)
      //console.log('newdraw')
    }
    else{
      this.resetOP()
    }
    //laser effect
    this.deltacont+=delta
    if(this.deltacont>this.deltalimit){
     rewind()
      this.deltacont=0
    }
  }
  this.resetOP=function(p){
    this.oldpoint=p||{x:this.ranx[0],y:this.rany[0]}
  }
  this.makeAxes=function(){
    const rad=0.4
    this.drawLine({x:0,y:canv.height},false,'green',rad)
    this.drawLine({x:canv.width,y:0},false,'red',rad)
    this.resetOP(this.oldpoint)
    
  }
  this.drawLine=function(newp,oldp,clr,lw){
    
    ctx.strokeStyle=clr || 'lightblue'
    ctx.lineWidth=lw || 1.0
    this.drawer.position.x=(this.offset.x+(oldp.x*this.speed||0))
    this.drawer.position.y=this.offset.y-(oldp.y||0)
    this.drawer.radius=3//(Math.abs(newp.y)+10)/30
    this.drawer.draw()
    ctx.beginPath()
    lw && ctx.moveTo(this.offset.x+(oldp.x||0),this.offset.y-(oldp.y||0))
    lw && ctx.lineTo(this.offset.x+newp.x,this.offset.y-newp.y)
    ctx.stroke()
    if (oldp){
     this.oldpoint=newp
    }
  }
  this.changeSpeed=function(){
    this.speed+=this.speed>3?-4:1
  }
  
}



simu=new drawfn('x*x/100'||'1000*Math.sin(1000*Math.PI*x/180/200)',[-220,200],0,0.5,canv.width/2,canv.height/2)
simu2=new drawfn(false||'100*Math.sin(500*Math.PI*x/180/200)',[-220,200],0,3,canv.width/2,canv.height/2)
simu3=new drawfn('50*Math.cos(500*Math.PI*x/180/200)',[-220,200],0,2,canv.width/2,canv.height/2)
simu4=new drawfn('x*x*x/10000'||'100*Math.cos(500*Math.PI*x/180/200)',[-220,200],0,1,canv.width/2,canv.height/2)
let simufl=new simu1('(platespeed*Math.cos(Math.PI/180*(Date.now()-starttime)/250)/Math.pow(ptcl.position.y,2)*10000000)'||'(platespeed*Math.cos((Math.PI*1*(Date.now()-starttime)/1000-Math.sqrt(1000/2/1)*ptcl.position.y)/180)*Math.exp(-Math.sqrt(1/2)*ptcl.position.y))')


let time0=0
let starttime=0
let simuarr=[simu,simu2,simu3,simu4]
function start(){
  time0=Date.now()
  starttime=time0
  if (switchbool)
    simu.start()
    else
    simufl.start()
}


function loop(){
  delta=(Date.now()-time0)/1000
  time0=Date.now()
  let deltadiv=document.getElementById('delta')
  let runtimediv=document.getElementById('runtime')
  deltadiv.innerHTML='Delta Time: '+delta
  runtime.innerHTML='Runtime: '+(Date.now()-starttime)/1000
  runtime.innerHTML+="<br>\u0444"+" = "+Math.sin(2*Math.PI*(200/380*it)/180).toString().substring(0,6)+ '  itr ='+it
  if (switchbool)
  for (let i=0;i<simuarr.length;i++){
    simuarr[i].process(delta)
  }
  else
  simufl.process(delta)
  
  it+=1
}
start()
let it=0
var mainloop = setInterval(loop,1000/framerate);
console.log(simu.pcolor)
function npause(){
  
  for (let i=0;i<simuarr.length;i++){
   simuarr[i].changeSpeed()
  }
  simufl.npause()
}

function rewind(){
  //simu.rewind()
  ctx.clearRect(0,0,canv.width,canv.height)
  simu.makeAxes()
  simufl.rewind()
  
}
function swichsimu(){
  simu.start()
  switchbool=!switchbool
}
var switchbool=false