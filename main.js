const canvas =document.querySelector('canvas')
const h =document.querySelector('h1')

const ctx=canvas.getContext('2d')
canvas.width=900
canvas.height=600
canvas.style.backgroundColor='#f1f1f1'
h.innerText=0
class Block{
  constructor(x,size,vel,mass){
    this.x=x
    this.size=size
    this.y=canvas.height-this.size
    this.vel=vel
    this.mass=mass
  }
  draw(){
    ctx.beginPath()
    ctx.fillRect(this.x,this.y,this.size,this.size)
    ctx.closePath()
  }
  update(){
    this.x+=this.vel
    this.draw()
  }
}

function elastic(a,b){
  let massSum=a.mass+b.mass
  let nV1=(((a.mass-b.mass)/massSum)*a.vel)+(((2*b.mass)/massSum)*b.vel)
  let nV2=(((b.mass-a.mass)/massSum)*b.vel)+(((2*a.mass)/massSum)*a.vel)
  a.vel=nV1
  b.vel=nV2
}

let block1=new Block(100,100,0,1)
let block2=new Block(500,300,-5,100)

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  requestAnimationFrame(animate)
  block1.update()
  block2.update()
  if(block2.x<=block1.x+block1.size){
    elastic(block1,block2)
    h.innerText++
  }
  if(block1.x<=0){
    block1.vel=-block1.vel
    h.innerText++
  }

}
animate()