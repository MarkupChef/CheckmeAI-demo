import { Question } from '@store/api/models/Questions.type';

export const mocQuestionList: Question[] = [
  {
    id: 0,
    expression: 'What is the use of the <video> tag in HTML5?',
    date: '',
    answerIndex: '2',
    answerUserIndex: 0,
    answerTime: 0,
    options: [
      'To create a clickable link to a video.',
      'To make a navigation menu easier to see.',
      'To embed video files to be played in a webpage.',
      'To play audio files in a descending order.',
    ],
    explanation:
      '\n\nThe <video> tag in HTML5 allows web developers to embed video files into websites. It enables videos to be played without using any external plugins or additional software. The browser can directly play the videos from the web page using the available video formats such as MP4, WebM, and Ogg. The <video> tag supports various attributes like autoplay, loop, controls, preload, etc. that can be used to customize the video playback.',
    practicalApplication: '',
  },
  {
    id: 1,
    expression: 'How can you use the <audio> tag to control the playback of audio in HTML5?',
    date: '',
    answerIndex: '1',
    answerUserIndex: 0,
    answerTime: 0,
    options: [
      'Automatically rearranging elements on the page.',
      'Setting attributes, such as loop, play and pause.',
      'Changing the color of text for emphasis.',
      'Wrapping content to fit the size of a window.',
    ],
    explanation:
      "\n\nThe <audio> tag allows you to control the playback of audio in HTML5 by setting the various attributes associated with it. This includes the 'loop' attribute, which if set to true will cause the audio to repeat once done playing. The 'play' and 'pause' attributes will start and stop the audio, respectively, so you can control when the audio plays and when it is paused. Additionally, other attributes control the volume, balance, playback speed, and more.",
    practicalApplication: '',
  },

  {
    id: 2,
    expression: 'What is the difference between the <audio> and <video> tags in HTML5?',
    date: '',
    answerIndex: '2',
    answerUserIndex: 0,
    answerTime: 0,
    options: [
      'The video tag can be used to embed video files while the audio tag cannot.',
      'The audio tag is used for embedding images and the video tag is used for text.',
      'The audio tag requires Flash and the video tag does not.',
      'The audio tag is used to add music and the video tag is used to add graphics.',
    ],
    explanation:
      "\n\nThe <audio> and <video> tags in HTML5 are used to embed audio and video files in a webpage. The main difference between them is that the <audio> tag requires a plugin such as Flash for the browser to play the audio file, while the <video> tag doesn't require a plugin as it supports the WebM, Ogg, and MP4 file formats. Therefore, browsers can play videos by using the native codecs without needing the the assistance of a plugin.",
    practicalApplication: '',
  },
  {
    id: 3,
    expression: 'What is the best way to embed a video from YouTube into an HTML5 document?',
    date: '',
    answerIndex: '0',
    answerUserIndex: 0,
    answerTime: 0,
    options: [
      'Use the <iframe> element.',
      'Add an externally linked script with the video code.',
      'Use the <video> element with the embed link.',
      'Include the video URL in the <body> element.',
    ],
    explanation:
      '\n\nThe <iframe> element is the best way to embed a video from YouTube into an HTML5 document. The <iframe> element allows you to specify a URL of the video you would like to embed and it will display it on the webpage in real time. It is also able to display additional information such as title, description, and other media related to the video in the webpage. This is a browser-based solution and does not require any additional plugins. Additionally, the <iframe> element also allows you to control the dimensions of the video, as well as various other parameters such as enabling/disabling autoplay, looping, and more.',
    practicalApplication: '',
  },
  {
    id: 4,
    expression: 'How can you use the <source> element to specify multiple sources for a media element in HTML5?',
    date: '',
    answerIndex: '0',
    answerUserIndex: 0,
    answerTime: 0,
    options: [
      'src attribute to list multiple sources separated by commas.',
      'source attribute to define the type and multiple sources as array.',
      'source element to identify multiple audio/video files.',
      'object element designated with multiple source tags.',
    ],
    explanation:
      '\n\nThe <source> element in HTML5 allows you to specify multiple sources for a media element such as an audio or video player. You can do this by using the src attribute, which is used to specify the location of a media file. You can list multiple sources separated by commas, allowing the browser to select the most suitable one depending on the device or browserâ€™s supported formats. This makes it possible to use a single media element and provide multiple alternatives for a variety of devices and browsers.',
    practicalApplication: '',
  },
  {
    id: 5,
    expression: 'What is the purpose of the "enctype" attribute of a form tag?',
    date: '',
    answerIndex: '3',
    answerUserIndex: 0,
    answerTime: 0,
    options: [
      'To contain the value of the submit button.',
      'To encode form data before submission.',
      'To facilitate server-side validation of form entries.',
      'To specify the content type used when submitting the form.',
    ],
    explanation:
      '\n\nThe purpose of the "enctype" attribute of a form tag is to specify the type of content used when submitting the form to the server. This attribute can be used to make sure that the form submission is handled correctly, for example when submitting files, uploaded images, or when encoding information in a particular format (e.g. when sending data in XML format). While the default behavior is often sufficient, when submitting complex information, this attribute can be used to make sure it is processed correctly.',
    practicalApplication: '',
  },
  {
    id: 6,
    expression: 'How would you create a form that automatically redirects the user to a different page on submit?',
    date: '',
    answerIndex: '3',
    answerUserIndex: 0,
    answerTime: 0,
    options: [
      'Paste a snippet of HTML code into the form that will activate a browser redirect after submission.',
      'Attach a JavaScript function to the submit button to perform the page redirect upon click.',
      'Add a timer that will automatically redirect the user after a set amount of time.',
      'Use the "on submit" action to specify the page the user should be redirected to.',
    ],
    explanation:
      "\n\nThe 'on submit' action is a feature of HTML forms that can be used to specify a page the user should be redirected to after the form is submitted. It requires the addition of an attribute called 'action' to the form tag and an attribute called 'method'. The action attribute specifies the web page the user should be redirected to after submitting the form, and the method attribute specifies whether the form data should be sent through the GET or POST method. To use the 'on submit' feature, simply add the action and method attributes to the form tag when creating the HTML form.",
    practicalApplication: '',
  },
  /* {
    id: 7,
    expression: 'Describe the process of submitting a form using AJAX.',
    date:'',answerIndex: 0,
    answerUserIndex: 1,
    options: [
      "Use an asynchronous non-blocking AJAX request to submit the form's data.",
      'Create a new user session and a new request type to submit the form.',
      'Write code to validate the data receiving the form and submit as a new AJAX event.',
      "Invoke a POST AJAX request with the form's data on page initialization.",
    ],
    explanation:
      "\n\nUsing AJAX to submit the form's data allows for asynchronous data transfers to and from the server. This method uses an asynchronous, non-blocking request that does not stop the page from loading while the request is sent to the server. The form data is packaged asynchronously and sent to the server. Once the server returns the response, the form is then processed. This process is significantly faster than traditional methods as the page does not need to wait for the server's response before loading.",
  },
  {
    id: 8,
    expression: 'Explain the difference between a "GET" and a "POST" form submission.',
    date:'',answerIndex: 1,
    answerUserIndex: 2,
    options: [
      'GET sends more data to the server than POST.',
      'POST requests send data to the server, GET requests are the results of sending data to the server.',
      'GET requests can only send strings, POST can send objects as well.',
      'POST are faster than GET, as GET form requires more validation.',
    ],
    explanation:
      '\n\nA GET request or form submission sends a URL encoded query string to the server. This contains parameters and values which can be processed by the server. A POST request or form submission sends data in the request body rather than the URL. It often contains more complex and sensitive data, such as file uploads, user input, or other more intricate information. The data is sent as part of the request, rather than added as a query string in the URL. The GET request is sent from the client to the server to request data, while the POST request is sent to the server to send data.',
  },
  {
    id: 9,
    expression: 'How can you validate form data on the client and server side?',
    date:'',answerIndex: 1,
    answerUserIndex: 1,
    options: [
      'Server side: Ask the user to input data twice.',
      'Client side: Use JavaScript to show error messages.',
      'Client side: Input data directly into the database.',
      'Server side: Create a confirmation email upon data entry.',
    ],
    explanation:
      '\n\nOn the client side, validation of form data can be done with JavaScript. This can mean showing an error message to the user before they submit the form. This should inform the user if there was an issue with any of the input fields, for example if the formatting or type of data was incorrect. On the server side, the data can also be checked to make sure it is correct. The server can also perform more complex checks, such as verifying the correctness of postal codes, phone numbers, and other similar types of data that would be difficult or impossible to do using JavaScript alone.',
  },
  {
    id: 10,
    expression: 'What is the best way to set the lang attribute on an html page to ensure accessibility for all users?',
    date:'',answerIndex: 2,
    answerUserIndex: 1,
    options: [
      '<html lang:en>',
      'Setting the automatic browser language detection.',
      '<html lang="en" xml:lang="en">',
      'Assigning the language to an object in the sources code.',
    ],
    explanation:
      '\n\nThis is a <html> tag used to set the language for the webpage. It specifies which language is used on the webpage. The "lang" attribute will be read by web browsers and other user agents so that the content can be presented in the correct language. This is important for accessibility, as it allows people with disabilities to access the web more effectively. The "xml:lang" attribute is also included, and this will ensure that any associated XML documents, if any, will be interpreted correctly.',
  },*/
];
