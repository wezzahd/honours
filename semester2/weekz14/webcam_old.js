
// List cameras and microphones.

navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
  devices.forEach(function(device) {
    console.log(device.kind + ": " + device.label +
                " id = " + device.deviceId + " group_id = " + device.groupId);
  });
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
});

//copy the device info from console to create constraints for the webcams
    constraints1 = {
        video: {
           deviceId: "3446176d8ea539c703908621935617a4d2935b63b6fe9ec61822e6ff28d6ea6f",
            groupId: "4ce59b724f5b75ecaf0a267019fe175bf5b256e8739268c553f4b44fa77ccc70",
            kind: "videoinput",
            label: "USB Camera (046d:0821)"

        }
    }
    constraints2 = {
        video: {
            deviceId: "54219a68080d00d6e77a534a1e19ba0d1ebbbfe90902d7b2df13992ff99fc400",
            groupId: "4d32ee31ddc7607fb6cfa290cc8abca54a5caf7656af09035f47853f8d27ba5f",
            kind: "videoinput",
            label: "USB Camera #2 (046d:0821)"
        }
    }
