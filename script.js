const form = document.querySelector("#reservation-form");
const modal = document.querySelector("#response-modal");
const modalTitle = document.querySelector("#modal-title");
const modalMessage = document.querySelector("#modal-message");
const modalClose = document.querySelector("#modal-close");
const submitButton = form.querySelector(".submit-button");

const endpoint = "https://formsubmit.co/ajax/sdfdsagtr25@gmail.com";
const successMessage = "곧 담당 실장이 전화드릴 예정입니다. 휴대폰을 잘 확인해 주세요.";
const failureMessage = "전송이 원활하지 않습니다. 잠시 후 다시 시도해 주세요.";

function showModal(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modal.hidden = false;
  modalClose.focus();
}

function closeModal() {
  modal.hidden = true;
}

function setSubmitting(isSubmitting) {
  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting ? "전송 중입니다" : "지금 문의 보내기";
}

function touchInvalidField() {
  const invalidField = form.querySelector(":invalid");
  if (invalidField) {
    invalidField.focus();
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    touchInvalidField();
    return;
  }

  setSubmitting(true);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: new FormData(form),
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    form.reset();
    showModal("문의가 접수되었습니다.", successMessage);
  } catch (error) {
    showModal("전송을 완료하지 못했습니다.", failureMessage);
  } finally {
    setSubmitting(false);
  }
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeModal();
  }
});
