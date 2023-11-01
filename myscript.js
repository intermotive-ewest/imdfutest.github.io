document.addEventListener('DOMContentLoaded', event => {
  let button = document.getElementById('connect')

/*   button.addEventListener('click', async() => {
    let device
    const VENDOR_ID = 0x0403

	//await navigator.permissions.query({name:'usb', filters: []})
    try {
      device = await navigator.usb.requestDevice({
        filters: [{
          vendorId: VENDOR_ID
        }]
      })

      console.log('open')
      await device.open()
      console.log('opened:', device)
    } catch (error) {
      console.log(error)
    }
	  await device.close()
  })*/
  
/* 	navigator.serial.addEventListener("connect", (e) => {
		// Connect to `e.target` or add it to a list of available ports.
		console.log('connected!')
	}); */

/* 	navigator.serial.addEventListener("disconnect", (e) => {
		// Remove `e.target` from the list of available ports.
	});
 */
	button.addEventListener("click", async() => {
	  const usbVendorId = 0x0403;
	  
		try{
			port = await navigator.serial.requestPort({ filters: [{ usbVendorId }] })

			console.log('open')
			await port.open({baudRate: 38400})
			while (port.readable) {
			  const reader = port.readable.getReader();
			  try {
				while (true) {
				  const { value, done } = await reader.read();
				  if (done) {
					// |reader| has been canceled.
					break;
				  }
				  // Do something with |value|...
				  let i = 0;
				  let valueString = String.fromCharCode.apply(null, value);

				  console.log(valueString);
				}
			  } catch (error) {
				// Handle |error|...
			  } finally {
				reader.releaseLock();
			  }
			}
		} catch (error) {
			console.log(error)
		}
	});
}) 