const loadPhone = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data, dataLimit);
  // displayPhone
};

loadPhone("a");

const displayPhone = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerHTML = "";
  //   display no phone found

  const noPhone = document.getElementById("no-found-message");

  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  //   display all phone
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card p-4 ">
                <img src="${phone.image}" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                    </p>
                    <button href="#" class="btn btn-primary" onclick="loadPhoneDetail('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show details</button>

  
                </div>
            </div>
        
        `;
    phonesContainer.appendChild(phoneDiv);
  });
  toggleLoader(false);
};

const processSearch = (dataLimit) => {
  toggleLoader(true);
  const searchInput = document.getElementById("search-field");
  const searchText = searchInput.value;
  loadPhone(searchText, dataLimit);
};

document.getElementById("search-field-form").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("input entered", e);
  // processSearch(10);
});

document.getElementById("btn-search").addEventListener("click", () => {
  processSearch(10);
});

const toggleLoader = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else loaderSection.classList.add("d-none");
};
//  not the best wau to show all
document.getElementById("btn-showAll").addEventListener("click", () => {
  processSearch();
});

// loadPhone()
const loadPhoneDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetail(data.data);
};

const displayPhoneDetail = (phone) => {
  console.log(phone);
  const modalTittle = document.getElementById("phoneDetailModalLabel");
  modalTittle.innerText = phone.name;

  // const modalImage = document.getElementById('modal-image');
  // modalImage.src = phone.image;

  const phoneDetails = document.getElementById("phone-detail");
  // const productReleaseDate = document.createElement('p')
  phoneDetails.innerHTML = `
    <img id="modal-image" src="${phone.image}" alt=""> 
    <p>Release date: ${phone.releaseDate ? phone.releaseDate : "N/A"}</p>
    <p>Others: ${
      phone.others ? phone.others.Bluetooth : "no bluetooth information"
    }</p>
    <p>Storage: ${
      phone.mainFeatures ? phone.mainFeatures.storage : "No storage info found"
    }</p>
    `;

   const phoneSensors =   phone.mainFeatures.sensors;
   console.log(phoneSensors);
   for(let sensor of phoneSensors) {
    const phoneSensors = document.createElement("span");
    // phoneSensors.classList.add('d-inline')
    phoneSensors.innerText = `
         ${sensor}
       `;
    phoneDetails.appendChild(phoneSensors);
   }
//   phone.mainFeatures.sensors.forEach((sensor) => {
//     console.log(sensor);
//     const phoneSensors = document.createElement("span");
//     // phoneSensors.classList.add('d-inline')
//     phoneSensors.innerText = `
//          ${sensor}
//        `;
//     phoneDetails.appendChild(phoneSensors);
//   });
};
