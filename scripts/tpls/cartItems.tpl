 <tr>
	        <td class="row">
	          <a class="hide-for-small" href="/product/womens-scarf"><img alt="example graphic" src="images/graphic.jpg"></a>
	          <div class="short-description" style="float:right;padding-right:20px;">
	            <h3><a href="#">{{ name }}</a></h3>
	          </div>
	        </td>
	        <td class="narrow row"><input id="Qty_{{ id }}" class="quantity" value="{{ quantity }}" type="text"></td>
	        <td class="narrow row">${{ price }}</td>
	        <td class="narrow row">${{ total }}</td>
	        <td class="narrow row"><a href="cart/del/{{ id }}"><button class="remBtn" id="itm_{{ id }}">X</button></a></td>      
      </tr>