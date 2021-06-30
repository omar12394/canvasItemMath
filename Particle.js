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

const simu1=function(){
  var particles=[]
  var platespeed=0.0001
  const particlescount=60
  const shift= 6
  const pradius= 2
  const pyoffset=0
  const pcolorr=170
  const hslrangeh=[pcolorr,60]
  
  this.start=function(){
    var pcolor;
    for (let j=0 ;j<particlescount;j++){
      for (let i=0;i<particlescount;i++){
      //pcolor="#"+(j*shift*50).toString().slice(0,2)+"f";
         var xpos=j*shift
        var ypos=(i)*shift
        pcolor="hsl("+(hslrangeh[0]+(xpos/c.width*hslrangeh[1])).toString().slice(0,3)+",100%,"+(xpos+20)/c.width*70+"%)"
         if (j*shift<=c.width)
          particles.push(new Particle(xpos,ypos,pradius,pcolor))
      }
    }
    console.log(particles.length)
  }
  this.process=function(delta){
    ctx.clearRect(0,0,c.width,c.height)
    particles.forEach((ptcl,indx)=>{
      if( ptcl.position.x>c.width || ptcl.position.x <0){
        //particles.pop(indx);
        //delete ptcl;
        ptcl.position.x=ptcl.position.x-(c.width*Math.sign(ptcl.position.x))+Math.pow(ptcl.position.y,2)*platespeed*delta
        ptcl.draw()
      }
      else{
      ptcl.position.x+=Math.pow(ptcl.position.y,2)*platespeed*delta
      ptcl.radius+=0
      ptcl.draw()
        }
        ptcl.position.x+=10*delta
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



simu=new simu1()
let time0=0
let starttime=0



