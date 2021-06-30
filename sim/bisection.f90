
program bisection

  real a,b,eabs,estep,c
  print*,"enter a,b"
  read *,a,b
  print*,"enter values of error abs and error step "
  read*,eabs,estep
  print*,"enter max number of iterations"
  read*,N


  if(f(a)*f(b)>0)then
    print*,"wrong values for a , b "
    elseif(abs(f(a))<eabs)then
        print*,"the root=",a
    elseif(abs(f(b))<eabs)then
        print*,"the root =",b
    else
        do k=1,N
           c=(a+b)/2.0
        if ((abs(f(c))<eabs).or.(abs(b-a)<estep))then
            print*,"the root=",c
            exit
        elseif(f(a)*f(c)<0)then
            b=c
        else
            a=c
        end if
        end do
        if(k>N)then
            print*,"can't find the root"
        end if

  end if





end program bisection




real function f(x)
real x
f=x**2-3
end function
