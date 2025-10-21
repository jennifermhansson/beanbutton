/*
 * @Author: MoS
 * @Date: 2025-10-17 09:19:24
 * @Last Modified by: MoS
 * @Last Modified time: 2025-10-17 09:45:17
 */

const formName = document.getElementById("formName");
const nameInput = document.getElementById("nameInput");

nameInput.addEventListener("input", (e) => {
  e.preventDefault();

  if(nameInput.trim()){
    console.log("TRUE - Denna ska vara true")
  }
  else{
    console.log("FALSE -Denna ska vara False")
  }
})
