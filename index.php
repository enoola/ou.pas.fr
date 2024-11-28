<?php

// List of HTML files
$html_files = [ 'index1_anim_nb_cartoon.html',
    'index2_font_matrix.html',
    'index3_font_matrix_colorized.html',
    'index3_font_matrix_colorized2.html',
    'index4_galaxyRevealText.html',
    'typescript_machine_bw/idx_typescript_machine_bw.html',
    'balls_falling_and_bouncing/balls_falling_and_bouncing.html'
];

// Randomly select a file from the list
$random_file = $html_files[array_rand($html_files)];

// Check if the file exists
if (file_exists($random_file)) {
    // Read the contents of the file
    $content = file_get_contents($random_file);
    
    // Display the content
    echo $content;
} else {
    echo "The selected file does not exist.".$_passwd;
}


?>