
export function getFormateDate(d){
    let dd = new Date(d)
    return new Intl.DateTimeFormat('en-GB', { 
          year: 'numeric', 
          month: 'numeric', 
          day: 'numeric' 
        }).format(dd)
}



export default function getFormaNumber(amount){
    return Number(amount).toFixed(2)
}


