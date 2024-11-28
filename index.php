<?php

// List of HTML files
$html_files = [ 'index1.html',
    'index2.html',
    'index3.html'
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