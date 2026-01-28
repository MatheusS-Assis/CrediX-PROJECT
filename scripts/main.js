  function goTo(url) {
    document.body.classList.add("page-transition");

    setTimeout(() => {
      window.location.href = url;
    }, 300);
  }