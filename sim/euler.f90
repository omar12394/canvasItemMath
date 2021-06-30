program euler

 real x0,y,x,h,xi
 x0=0
 y=1
 x=1
 h=0.25
 xi=x0

 do while(xi<x)
    y=dy(xi,y)*h+y
    xi=xi+h
   ! print*,"x=",xi,"y=",y
 end do

 print*,"x=",xi,"y=",y

end


real function dy(x,y)
real x,y
dy=2*x+y
end function
