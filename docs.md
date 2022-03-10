## Functions

<dl>
<dt><a href="#calcEpsilonTotal">calcEpsilonTotal(epsilonE, epsilonI)</a> ⇒ <code>number</code></dt>
<dd><p>Calculate the fraction of the volume in the column that is occupied by eluent, both outside and inside the stationary phase particles.</p>
</dd>
<dt><a href="#calcVoidVolume">calcVoidVolume(innerDiameter, length, epsilonT)</a> ⇒ <code>number</code></dt>
<dd><p>Calculate the volume in the column that is accessible to the mobile phase (the space between the particles and within them).</p>
</dd>
<dt><a href="#calcVoidTime">calcVoidTime(voidVolume, flowRate)</a> ⇒ <code>number</code></dt>
<dd><p>Calculate the time required for an entirely unretained solute to pass through the column.</p>
</dd>
<dt><a href="#LabeledInput">LabeledInput(props)</a></dt>
<dd><p>Component consisting of 1) a label with text,
2) a textbox, 3) a span with unit information</p>
</dd>
</dl>

<a name="calcEpsilonTotal"></a>

## calcEpsilonTotal(epsilonE, epsilonI) ⇒ <code>number</code>
Calculate the fraction of the volume in the column that is occupied by eluent, both outside and inside the stationary phase particles.

**Kind**: global function  
**Summary**: Calculate Total Porosity (Eq. 3)  
**Returns**: <code>number</code> - Total Porosity  
**Since**: 09 March 2022  
**Author**: Thomas J. Lauer  

| Param | Type | Description |
| --- | --- | --- |
| epsilonE | <code>number</code> | Interparticle (External) Porosity |
| epsilonI | <code>number</code> | Intraparticle (Internal) Porosity |

<a name="calcVoidVolume"></a>

## calcVoidVolume(innerDiameter, length, epsilonT) ⇒ <code>number</code>
Calculate the volume in the column that is accessible to the mobile phase (the space between the particles and within them).

**Kind**: global function  
**Summary**: Calculate Void Volume (Eq. 4)  
**Returns**: <code>number</code> - Void Volume [mL]  
**See**: [calcEpsilonTotal(epsilonE, epsilonI)](#calcEpsilonTotal)  
**Since**: 09 March 2022  
**Author**: Thomas J. Lauer  

| Param | Type | Description |
| --- | --- | --- |
| innerDiameter | <code>number</code> | Column Inner-Diameter [mm] |
| length | <code>number</code> | Column Length [mm] |
| epsilonT | <code>number</code> | Total Porosity |

<a name="calcVoidTime"></a>

## calcVoidTime(voidVolume, flowRate) ⇒ <code>number</code>
Calculate the time required for an entirely unretained solute to pass through the column.

**Kind**: global function  
**Summary**: Calculate Void Time (Eq. 5)  
**Returns**: <code>number</code> - Void Time [s]  
**See**: [calcVoidVolume(innerDiameter, length, epsilonT)](#calcVoidVolume)  
**Since**: 09 March 2022  
**Author**: Thomas J. Lauer  

| Param | Type | Description |
| --- | --- | --- |
| voidVolume | <code>number</code> | Void Volume [mL] |
| flowRate | <code>number</code> | Flow Rate [mL/min] |

<a name="LabeledInput"></a>

## LabeledInput(props)
Component consisting of 1) a label with text,2) a textbox, 3) a span with unit information

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | component props |
| props.value | <code>\*</code> | value in text box |
| props.label | <code>string</code> | text before box |
| props.onChange | <code>any</code> | function to call with new value |
| props.unit | <code>string</code> | text after box, ex cm/mm/m |
| props.step | <code>number</code> | optional, default: 1, increment/decrement amount for arrows |
| props.verify | <code>any</code> | optional, default fails negatives, function that takes in 1 parameter and returns boolean whether it is valid or not |
| props.disabled | <code>boolean</code> | whether or not the input can be changed |

