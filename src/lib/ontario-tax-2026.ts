// CRA T4032 Ontario, January 2026. Annual estimate for standard personal credits.
const federalLimits = [58523,117045,181440,258482,Infinity];
const provincialLimits = [53891,107785,150000,220000,Infinity];
function progressive(income: number, limits: number[], rates: number[]) {
  let tax=0, previous=0;
  limits.forEach((limit,index)=>{tax+=Math.max(0,Math.min(income,limit)-previous)*rates[index];previous=limit;});
  return tax;
}
export function ontarioAnnualTax2026(income: number, cppBase=0, ei=0, employmentIncome=income) {
  const federalBpa=16452-1623*Math.min(1,Math.max(0,(income-181440)/(258482-181440)));
  const federal=Math.max(0,progressive(income,federalLimits,[.14,.205,.26,.29,.33])-.14*(federalBpa+cppBase+ei+Math.min(1501,employmentIncome)));
  const basic=Math.max(0,progressive(income,provincialLimits,[.0505,.0915,.1116,.1216,.1316])-.0505*(12989+cppBase+ei));
  const surtax=Math.max(0,basic-5818)*.2+Math.max(0,basic-7446)*.36;
  const reduction=Math.min(basic+surtax,Math.max(0,600-basic-surtax));
  const health=income<=20000?0:income<=36000?Math.min(300,(income-20000)*.06):income<=48000?Math.min(450,300+(income-36000)*.06):income<=72000?Math.min(600,450+(income-48000)*.25):income<=200000?Math.min(750,600+(income-72000)*.25):Math.min(900,750+(income-200000)*.25);
  return {federal,provincial:basic+surtax-reduction+health};
}
export function ontarioPayroll2026(salary: number) {
  const contributory=Math.max(0,Math.min(salary,74600)-3500);
  const cppBase=contributory*.0495;
  const cppAdditional=contributory*.01+Math.max(0,Math.min(salary,85000)-74600)*.04;
  const cpp=cppBase+cppAdditional;
  const ei=Math.min(salary,68900)*.0163;
  const taxes=ontarioAnnualTax2026(Math.max(0,salary-cppAdditional),cppBase,ei,salary);
  return {...taxes,cpp,ei};
}
