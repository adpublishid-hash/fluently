const fs = require('fs');
const path = require('path');

const PRONUN_DIR = path.join(
  __dirname,
  '../src/pages/module/english/beginner/pronunciation'
);

const LESSONS_TO_FIX = [2, 4, 5];

for (const n of LESSONS_TO_FIX) {
  const filePath = path.join(PRONUN_DIR, `Lesson${n}.tsx`);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ Not found: Lesson${n}.tsx`);
    continue;
  }

  let src = fs.readFileSync(filePath, 'utf8');
  const original = src;

  // The missing `</div>` should be added right before `</motion.div>` in the practice tab.
  // The pattern in these files looks like:
  //               </div>
  //                 </motion.div>
  //             ) : (
  // We want to replace it with:
  //               </div>
  //             </div>
  //                 </motion.div>
  //             ) : (

  const searchPattern = /              <\/div>\n                <\/motion\.div>\n            \) : \(/g;
  const replacement = '              </div>\n            </div>\n                </motion.div>\n            ) : (';

  if (searchPattern.test(src)) {
    src = src.replace(searchPattern, replacement);
    fs.writeFileSync(filePath, src, 'utf8');
    console.log(`✅ Fixed: Lesson${n}.tsx`);
  } else {
    // Check if there's no exact whitespace match, so we simply search for `</motion.div>\n            ) : (`
    const altPattern = /(<\/div>\s*)(<\/motion\.div>\s*\) : \()/g;
    if (altPattern.test(src)) {
        src = src.replace(altPattern, '$1</div>\n                $2');
        fs.writeFileSync(filePath, src, 'utf8');
        console.log(`✅ Fixed (alt): Lesson${n}.tsx`);
    } else {
        console.log(`⚪ No match found to insert </div> in Lesson${n}.tsx`);
    }
  }
}
