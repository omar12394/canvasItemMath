program secant
real x0,x1,x2,eabs,estep


print*,"enter x0 and x1"
read*,x0,x1
print*,"enter error abs and error step"
read*,eabs,estep
print*,"enter max number of iterations"
read*,N

if (abs(f(x0))<eabs)then
    print*,"The root=",x0
elseif(abs(f(x1))<eabs)then
    print*,"The root=",x1
else
    do i=1,N
 x2=x1-f(x1)*(x1-x0)/(f(x1)-f(x0))
 if ((abs(f(x2))<eabs).or.(abs(x2-x1))<estep)then
    print*,"The root=",x2
    exit
 else
    x0=x1
    x1=x2

 end if
 end do

 if (i>N)then
    print*,"can't find the root "
 end if


end if

end program secant


real function f(x)
real x
f=exp(-1*x)-x
end function
