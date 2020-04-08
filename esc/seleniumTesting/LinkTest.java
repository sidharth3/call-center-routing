import java.security.SecureRandom;
import java.util.NoSuchElementException;
import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;


public class LinkTest {
	
	static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	static SecureRandom rnd = new SecureRandom();

	static String randomString( int len ){
	   StringBuilder sb = new StringBuilder( len );
	   for( int i = 0; i < len; i++ ) 
	      sb.append( AB.charAt( rnd.nextInt(AB.length()) ) );
	   return sb.toString();
	}
		
	public static void main(String[] args) throws InterruptedException {		
		String projectPath = System.getProperty("user.dir");
		System.out.println("projectPath: " + projectPath);
		
		System.setProperty("webdriver.gecko.driver", projectPath + "\\Drivers\\geckodriver\\geckodriver.exe");
		WebDriver driver = new FirefoxDriver();

		driver.get("http://localhost:3000/#");
		
		java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
		System.out.println(links.size());
		
		for (int i = 0; i < links.size(); i=i+1) {
			System.out.println(i + " " + links.get(i).getText());
			System.out.println(i + " " + links.get(i).getAttribute("href"));
		}
		for(int i = 0; i < links.size(); i++)
		{
			System.out.println("*** Navigating to" + " " + links.get(i).getAttribute("href"));
			if (links.get(i).getAttribute("href") == null)
				continue;
			boolean staleElementLoaded = true;
			//the loop checks whether the elements is properly loaded
			while(staleElementLoaded) {
				try {
					//navigate to the link
					driver.navigate().to(links.get(i).getAttribute("href"));
					String title = driver.getTitle();
					System.out.println(title);
					if(title.equals("Error")) {
						System.out.println("Broken link found.");
						driver.close();
					}
					Thread.sleep(3000);
					//click the back button in browser
					driver.navigate().back();
					links = driver.findElements(By.tagName("a"));
					System.out.println("*** Navigated to" + " " + links.get(i).getAttribute("href"));
					staleElementLoaded = false;
				} catch (StaleElementReferenceException e) {
					staleElementLoaded = true;
				}
			}
		}
		
		//driver.findElement(By.id("support_image")).click();
				
		driver.close();
	}
}
