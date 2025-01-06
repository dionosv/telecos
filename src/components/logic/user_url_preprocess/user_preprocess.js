import router from "@/router";

function url_preprocess(param) {
    let page_title ="";
    if (param) {
        switch(param[0]) {
            case "redirect-to-ahli":
                page_title = "Ahli";
                router.push({ name: "detail_expert_id", params: { expertId: param[1] } });
                break;
            case "redirect-laporan-telecos-care":
                page_title = "Telecos Care";
                router.push({ name: "detail_laporan_telecos_care", params: { laporan_id: param[1] } });
                break;
            case "redirect-lapor-telecos-care":
                page_title = "Telecos Care";
                router.push({ name: "lapor_telecos_care" });
                break;
            case "redirect-telecos-care":
                page_title = "Telecos Care";
                router.push({ name: "telecos_care" });
                break;
            case "redirect-detail-akun":
                page_title = "Detail Akun";
                router.push({ name: "detail_akun" });
                break;
            case "redirect-daftar-ahli-favorit":
                page_title = "Ahli Favorit";
                router.push({ name: "daftar_ahli_favorit" });
                break;
            default: 
                page_title = "Home";
                router.replace({ 
                    name: "akun",
                    params: {}
                });
                break;
        }
    } else {
        page_title = "Home";
        router.push({ name: "home" });
    }
    
    return page_title;
}

function handle_url_page_title(param){
    let page_title ="";
    if (param) {
        switch(param[0]) {
            case "redirect-to-ahli":
                page_title = "Ahli"; 
                break;
            case "redirect-laporan-telecos-care":
                page_title = "Telecos Care"; 
                break;
            case "redirect-lapor-telecos-care":
                page_title = "Telecos Care"; 
                break;
            case "redirect-telecos-care":
                page_title = "Telecos Care"; 
                break;
            case "redirect-detail-akun":
                page_title = "Detail Akun"; 
                break;
            case "redirect-daftar-ahli-favorit":
                page_title = "Ahli Favorit"; 
                break;
            default: 
                page_title = "Home"; 
                break;
        }
    } else {
        page_title = "Home"; 
    }
    
    return page_title;

}
export { url_preprocess ,handle_url_page_title};