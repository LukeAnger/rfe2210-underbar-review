import React from 'react'

// result will be some text such as "x squared", "square root x", "x divided by 2", "cosine x", "feet per second" or something similar
// the goal is to convert keywords/phrases to math symbols
// x squared = x<sup>2</sup>
// square root = <span style={{whiteSpace: 'nowrap', fontSize:'larger'}}>
// &radic;
//<span style={{textDecoration:'overline'}}>&nbsp;x + 1&nbsp;</span>
// </span>

// Physics test - A ball is thrown downward from a 200 ft tower at 40 ft/s.
// How fast is it traveling when it lands?

// We need to look for direction, speed, position keywords
// DOWN - downward, descending, dropping, falling
// FROM - could possibly indicate a position being stated
// ft/s - indicates a speed (magnitude - no direction)

//   Speech recognition filter will detect certain variables and assign their values
// in the above example, the "downward" keyword will apply a negative sign to the
// initial velocity value detected from ft/s.
//   The position will be gathered from the "from" keyword and the "ft" keyword.
//   The question might be the hardest string to parse but we can parse the question word "How" and the "fast" keyword indicating speed and the "lands" keyword as being the ground if no Numbers follow.
//   So we will end up with the following known variables
// x-initial = 200 ft
// x-final = 0 ft
// v-initial = -40 ft/s
// v-final = null
// t = null
// a is constant at -32.174 ft/s
// if (!t & (!v1 || !v2)) {}
// if (v1, v2) {do eq 1 solve t}
// if (t, x1, x2) { do eq 2 solve v1}
// if (x1, x2, v1) {do eq 3 solve v2}
// triggers eq 3 so we do the math
// v2 = sqrt(v1^2 + 2x(x2-x1))
// display all variables, solved variable is highlighted with equation used
// animate the actual event

export const displayVariable = (letter, sub, variable) => {
  sub = sub || ''
  let name = letter + sub
  let unit = ''
  if (letter.includes('x')) unit = ' m'
  else if (letter.includes('v')) unit = ' m/s'
  else if (letter === 'a') unit = ms2()
  else if (letter === 't') unit = ' s'
  return (
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '7rem'}}>
      <div>{subscript(letter, sub)} =</div>
      &nbsp;
      <div className={name} style={{marginLeft: '5px'}}>{variable?variable + unit:'--'}</div>
    </div>
  )
}

export let subscript = (letter, sub) => (
<span>{letter}<sub style={{fontSize: '0.6rem'}}>{sub}</sub></span>
)

export let superscript = (letter, sup) => (
<span>{letter}<sup style={{fontSize: '0.6rem'}}>{sup}</sup></span>
)

export let sqrtHTML = (string) => (
  <><span style={{fontSize: '1.1rem'}}>√</span><span className='sqrt' style={{borderTop: '1px solid black'}}>{string}</span></>
)

export let eq1 = () => (<div>{subscript('v', '2')} = {subscript('v', '1')} + at</div>)
export let eq2 = () => (<div>{subscript('x', '2')} = {subscript('x', '1')} + {subscript('v', '1')}t + 0.5a{superscript('t', '2')}</div>)
export let eq3 = () => (<div>{subscript('v', '2')}² = {subscript('v', '1')}² + 2a&#916;x </div>)
export let quad = () => (<div><div><span style={{borderBottom: '1px solid black'}}>-b ±<span style={{fontSize: '1.1rem'}}>√</span>
<span className='sqrt' style={{borderTop: '1px solid black'}}>
b² - 4ac</span></span></div><div style={{marginLeft: '30%'}}>2a</div></div>)


