const fs = require('fs');

const files = [
  'src/pages/module/english/beginner/pronunciation/Lesson7.tsx',
  'src/pages/module/english/beginner/pronunciation/Lesson9.tsx'
];

files.forEach(f => {
  const filePath = __dirname + '/../' + f;
  if (!fs.existsSync(filePath)) return;
  
  let src = fs.readFileSync(filePath, 'utf8');
  
  // They both have:
  //                   </div>
  //             </div>
  //                 </motion.div>
  const badPattern = /(\s*<\/div>\n\s*<\/div>\n\s*<\/motion\.div>\n\s*\) : \()/;
  
  // Actually, Lesson 9 has:
  //                   </div>
  //             </div>
  //                 </motion.div>
  // Which matches `</div>\n            </div>\n                </motion.div>`
  
  // Let's just find `</div>` right before `</motion.div>` and remove one of them IF there are consecutive ones that cause a syntax error
  // Let's explicitly replace `</div>\n            </div>\n                </motion.div>` with `</div>\n                </motion.div>`.
  const exactPattern = /<\/div>\n            <\/div>\n                <\/motion\.div>\n            \) : \(/;
  if (exactPattern.test(src)) {
    src = src.replace(exactPattern, '</div>\n                </motion.div>\n            ) : (');
    fs.writeFileSync(filePath, src, 'utf8');
    console.log('Fixed', f);
  }
});
