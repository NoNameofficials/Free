(function () {

    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const APP_VERSION = "1.0.0";

    const GITHUB_API =
        "https://api.github.com/repos/NoNameofficials/Free/releases/latest";

    const GITHUB_RELEASES =
        "https://github.com/NoNameofficials/Free/releases/latest";

    const NOTIFICATION_ICON =
        "assets/free-prepaye-icon1.png";

    const STORAGE_KEY =
        "free_last_update_notification";


    /* =====================================================
       COMPARAISON DES VERSIONS
    ===================================================== */

    function normaliserVersion(version) {

        return String(version || "")
            .trim()
            .replace(/^v/i, "")
            .split("-")[0];

    }


    function comparerVersions(a, b) {

        const versionA =
            normaliserVersion(a)
                .split(".")
                .map(Number);

        const versionB =
            normaliserVersion(b)
                .split(".")
                .map(Number);


        const longueur =
            Math.max(
                versionA.length,
                versionB.length
            );


        for (let i = 0; i < longueur; i++) {

            const nombreA =
                Number.isFinite(versionA[i])
                    ? versionA[i]
                    : 0;

            const nombreB =
                Number.isFinite(versionB[i])
                    ? versionB[i]
                    : 0;


            if (nombreA > nombreB) {
                return 1;
            }

            if (nombreA < nombreB) {
                return -1;
            }

        }


        return 0;

    }


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    async function demanderPermission() {

        if (
            !("Notification" in window)
        ) {

            console.warn(
                "[Free] API Notification non disponible."
            );

            return false;

        }


        if (
            Notification.permission ===
            "granted"
        ) {

            return true;

        }


        if (
            Notification.permission ===
            "denied"
        ) {

            console.warn(
                "[Free] Notifications refusées."
            );

            return false;

        }


        try {

            const permission =
                await Notification.requestPermission();

            return (
                permission === "granted"
            );

        } catch (