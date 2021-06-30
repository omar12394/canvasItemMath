program trapz
 real a,b,h,area,e,oldarea
 integer n,ni

 a=0
 b=1
 n=4
 e=0.0001
 ni=20
 oldarea=0

 do k=1,ni
    h=(b-a)/n
    area=0
    do i=1,n-1
        area=area+f(a+i*h)
    end do
    area=(h/2.0)*(f(a)+2*area+f(b))
    if(n>4)then
        if(abs(area-oldarea)<e)then
            exit
        end if
    end if
    n=n*2
    oldarea=area


 end do
print *,"Area=",area
end



real function f(x)
real x
f=exp(x)
end function
