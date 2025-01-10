document.addEventListener("DOMContentLoaded", function () {
    // Get all sections and menu links
    const sections = document.querySelectorAll("section");
    const menuLinks = document.querySelectorAll("nav .menu-item a");

    // Function to show the target section and hide others
    const showSection = (targetId) => {
        sections.forEach((section) => {
            section.style.display = section.id === targetId ? "block" : "none";
        });
    };

    // Add click event listeners to all menu links
    menuLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            showSection(targetId);
        });
    });

    // Show the Home section by default on page load
    showSection("Home");

    // Toggle visibility of the "Top Artists" section in Home
    const toggleButton = document.getElementById("toggle-artists");
    const artistsSection = document.getElementById("artists");
    if (toggleButton && artistsSection) {
        toggleButton.addEventListener("click", () => {
            artistsSection.classList.toggle("show");
        });
    }

    // Audio Player Controls
    const audioPlayer = document.getElementById("audio-player");
    const playButton = document.getElementById("play-button");
    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");

    let currentSongs = [];
    let currentSongIndex = 0;

    // Define songs for each artist
    const songsByArtist = {
        "Jagjit Singh": [
            { name: "Huthon Se Chuu Lu", src: "./artists/jagjit_singh/jgsong1.mp3" },
            { name: "Song A2", src: "" },
        ],
        "Ankit Tiwari": [
            { name: "Song B1", src: "./artists/ankit tiwari/atsong1.mp3" },
            { name: "Song B2", src: "" },
        ],
        "Darshan Raval": [
            { name: "Song C1", src: "" },
            { name: "Song C2", src: "" },
        ],
    };

    // Function to update the song list dynamically
    const updateSongList = (songList, songs) => {
        if (!songList) return; // Ensure songList exists
        songList.innerHTML = ""; // Clear the previous song list
        songs.forEach((song) => {
            const songItem = document.createElement("li");
            songItem.textContent = song.name;
            songItem.dataset.src = song.src;

            // Add click event listener for each song item
            songItem.addEventListener("click", function () {
                console.log("Playing song:", song.name); // Debugging
                // Highlight the current song
                document.querySelectorAll(".song-list li").forEach((li) => li.classList.remove("playing"));
                songItem.classList.add("playing");

                // Play the selected song
                audioPlayer.src = song.src;
                audioPlayer.play();
                playButton.textContent = "Pause";
            });

            // Append the song item to the list
            songList.appendChild(songItem);
        });
    };

    // Event listener for artist clicks
    const artistNames = document.querySelectorAll(".artist-name");

    artistNames.forEach(artist => {
        artist.addEventListener("click", function () {
            console.log("Artist clicked:", artist.textContent);

            // Find the song list related to the clicked artist
            const songList = artist.nextElementSibling; // This assumes song list is right after artist name

            // Update the currentSongs array based on the clicked artist
            const artistName = artist.textContent.trim();
            if (songsByArtist[artistName]) {
                currentSongs = songsByArtist[artistName];
                currentSongIndex = 0; // Start from the first song of the selected artist
                updateSongList(songList, currentSongs);
            }

            // Toggle visibility of the song list
            if (songList && songList.classList.contains("song-list")) {
                songList.classList.toggle("hidden");
                songList.classList.toggle("visible");
            }
        });
    });

    // Play/Pause button functionality
    playButton.addEventListener("click", function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.textContent = "Pause";
        } else {
            audioPlayer.pause();
            playButton.textContent = "Play";
        }
    });

    // Next song functionality
    nextButton.addEventListener("click", function () {
        currentSongIndex = (currentSongIndex + 1) % currentSongs.length;
        audioPlayer.src = currentSongs[currentSongIndex].src;
        audioPlayer.play();
        playButton.textContent = "Pause";
    });

    // Previous song functionality
    prevButton.addEventListener("click", function () {
        currentSongIndex = (currentSongIndex - 1 + currentSongs.length) % currentSongs.length;
        audioPlayer.src = currentSongs[currentSongIndex].src;
        audioPlayer.play();
        playButton.textContent = "Pause";
    });
});
